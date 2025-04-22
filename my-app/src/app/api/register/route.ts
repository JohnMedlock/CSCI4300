import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  await connectMongoDB();

  // Check if email is already used with an account
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a document for new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Successfully registered user
  return NextResponse.json({
    message: 'User registered successfully',
    user: {
      username: user.username,
      email: user.email,
    }
  });
}
