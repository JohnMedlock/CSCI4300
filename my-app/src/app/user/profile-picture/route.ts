import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, profile_picture } = await req.json();

    await connectMongoDB();

    const user = await User.findOneAndUpdate(
      { email },
      { profile_picture },
      { new: true }
    ).populate('likedSpots uploadedSpots');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: user.username,
      email: user.email,
      profileImage: user.profile_picture,
      likedSpots: user.likedSpots,
      uploadedSpots: user.uploadedSpots,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update profile picture' }, { status: 500 });
  }
}

