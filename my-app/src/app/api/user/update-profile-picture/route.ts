import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/db';
import User from '@/models/User';

/**
 * Updates a user's profile image using the email provided in the request header.
 *
 * Requires:
 * - `x-user-email` header to identify the user
 * - JSON body with `profileImage` field
 *
 * @param {NextRequest} req - The HTTP request object from Next.js
 * @returns {Promise<NextResponse>} A JSON response with a success message and updated user data
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const email = req.headers.get('x-user-email');
  const { profileImage } = await req.json();

  if (!email || !profileImage) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  await connectMongoDB();

  // Update the user's profile picture based on their email
  const user = await User.findOneAndUpdate(
    { email },
    { profile_picture: profileImage },
    { new: true }
  );

  return NextResponse.json({ message: 'Profile image updated', user });
}
