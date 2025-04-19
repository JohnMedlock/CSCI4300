import { NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  await connectMongoDB();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

