import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';
import StudySpot from '@/models/StudySpot';

export async function GET(req: NextRequest) {
  await connectMongoDB();

  const email = req.headers.get('x-user-email');
  if (!email) {
    return NextResponse.json({ error: 'Missing user email' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email })
  .populate('likedSpots')
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

