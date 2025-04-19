// src/app/api/spots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';        // ① add
import StudySpot from '@/models/StudySpot';

export async function POST(request: NextRequest) {
  const email = request.headers.get('x-user-email');     // ② add
  if (!email) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // original body parsing
  const {
    name,
    description,
    address,
    coordinates = { lat: 0, lng: 0 },
    tags = [],
    image,
  } = await request.json();

  // ③ create the spot with owner reference
  const newSpot = await StudySpot.create({
    name,
    description,
    address,
    coordinates,
    tags,
    image,
    owner: user._id,                       // ★
  });

  // ④ push the spot into the user’s uploads and save
  user.uploadedSpots?.push(newSpot._id);
  await user.save();

  return NextResponse.json(
    { message: 'Study spot added', spot: newSpot },
    { status: 201 },
  );
}
