// src/app/api/spots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import StudySpot from '@/models/StudySpot';
import User from '@/models/User';

export async function GET(_req: NextRequest) {
  await connectMongoDB();
  const spots = await StudySpot.find();
  return NextResponse.json({ spots });
}

export async function POST(req: NextRequest) {
  /* 1 ─── authenticate via e‑mail header ─────────────────────────── */
  const email = req.headers.get('x-user-email');
  if (!email) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  await connectMongoDB();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  /* 2 ─── create the spot with owner reference ───────────────────── */
  const {
    name,
    description,
    address,
    coordinates = { lat: 0, lng: 0 },
    tags = [],
    image,
  } = await req.json();

  const newSpot = await StudySpot.create({
    name,
    description,
    address,
    coordinates,
    tags,
    image,
    owner: user._id,                // <<< link to uploader
  });

  /* 3 ─── push into user.uploadedSpots and save ──────────────────── */
  user.uploadedSpots?.push(newSpot._id);
  await user.save();

  return NextResponse.json(
    { message: 'Study spot added', spot: newSpot },
    { status: 201 },
  );
}
