import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const email = req.headers.get('x-user-email');
  const { profileImage } = await req.json();

  if (!email || !profileImage) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  await connectMongoDB();
  const user = await User.findOneAndUpdate(
    { email },
    { profile_picture: profileImage },
    { new: true }
  );

  return NextResponse.json({ message: 'Profile image updated', user });
}

