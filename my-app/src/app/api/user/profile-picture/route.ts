import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, profile_picture } = await req.json();
    if (!email || !profile_picture) {
      return NextResponse.json({ error: 'Missing email or image' }, { status: 400 });
    }

    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { profile_picture },
      { new: true }
    ).populate('likedSpots').populate('uploadedSpots');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: updatedUser.username,
      email: updatedUser.email,
      profileImage: updatedUser.profile_picture,
      likedSpots: updatedUser.likedSpots || [],
      uploadedSpots: updatedUser.uploadedSpots || [],
    });

  } catch (error) {
    console.error('Error updating profile picture:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

