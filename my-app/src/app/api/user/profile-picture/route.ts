import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/db';
import User from '@/models/User';

/**
 * Updates a user's profile picture based on their email address.
 *
 * Expects a JSON body with `email` and `profile_picture` fields.
 *
 * @param {NextRequest} req - The HTTP request object from Next.js
 * @returns {Promise<NextResponse>} A JSON response with updated user data or an error message
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, profile_picture } = await req.json();

    if (!email || !profile_picture) {
      return NextResponse.json({ error: 'Missing email or image' }, { status: 400 });
    }

    await connectMongoDB();

    // Find the user by email and update their profile picture
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
