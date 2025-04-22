import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import StudySpot from '@/models/StudySpot';
import User from '@/models/User';

/**
 * Retrieves all study spots from the database.
 *
 * @param {NextRequest} _req - The HTTP request object from Next.js (unused)
 * @returns {Promise<NextResponse>} A JSON response containing all study spots
 */
export async function GET(_req: NextRequest): Promise<NextResponse> {
  await connectMongoDB();
  const spots = await StudySpot.find();
  return NextResponse.json({ spots });
}

/**
 * Creates a new study spot and links it to the authenticated user.
 *
 * Authentication is handled via a custom `x-user-email` header.
 *
 * @param {NextRequest} req - The HTTP request object from Next.js
 * @returns {Promise<NextResponse>} A JSON response with the newly created spot or an error
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Retrieve user email from custom header
  const email = req.headers.get('x-user-email');
  if (!email) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  await connectMongoDB();

  // Find the user associated with the provided email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Extract study spot details from request body
  const {
    name,
    description,
    address,
    coordinates = { lat: 0, lng: 0 },
    tags = [],
    image,
  } = await req.json();

  // Create new study spot with reference to the uploader
  const newSpot = await StudySpot.create({
    name,
    description,
    address,
    coordinates,
    tags,
    image,
    owner: user._id,
  });

  // Link this spot to the user's uploaded spots and save
  user.uploadedSpots?.push(newSpot._id);
  await user.save();

  return NextResponse.json(
    { message: 'Study spot added', spot: newSpot },
    { status: 201 },
  );
}
