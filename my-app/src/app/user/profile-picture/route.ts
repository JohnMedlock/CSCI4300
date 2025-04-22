import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/db';
import User from '@/models/User';

/**
 * Updates the user's profile picture based on their email.
 *
 * Expects a JSON body with:
 * - `email`: the user's email address
 * - `profile_picture`: the new profile picture URL or path
 *
 * Responds with updated user data including liked and uploaded spots.
 *
 * @param {NextRequest} req - The incoming HTTP request
 * @returns {Promise<NextResponse>} The server response with updated user info or error
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, profile_picture } = await req.json();

    await connectMongoDB();

    // Find the user and update their profile picture
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
