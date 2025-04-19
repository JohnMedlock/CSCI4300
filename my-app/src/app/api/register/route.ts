import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  await connectMongoDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({
    message: 'User registered successfully',
    user: {
      username: user.username,
      email: user.email,
    }
  });
}

