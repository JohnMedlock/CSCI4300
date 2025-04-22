import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';
import '@/models/StudySpot';

/**
 * Retrieves a user's profile along with their liked and uploaded study spots.
 *
 * Requires the `x-user-email` header to identify the user.
 *
 * @param {NextRequest} req - The HTTP request object from Next.js
 * @returns {Promise<NextResponse>} A JSON response with the user's profile data or an error
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  await connectMongoDB();

  const email = req.headers.get('x-user-email');
  if (!email) {
    return NextResponse.json({ error: 'Missing user email' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email })
      .populate('uploadedSpots');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: user.username,
      email: user.email,
      profileImage: user.profile_picture,
      likedSpots: user.likedSpots,
      uploadedSpots: user.uploadedSpots
    });
  } catch (err) {
    console.error('[GET /api/user/profile]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
