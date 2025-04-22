import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import StudySpot from '@/models/StudySpot';
import connectMongoDB from '@/config/mongodb';

/**
 * Deletes a study spot by its ID.
 *
 * @param {NextRequest} req - The HTTP request object from Next.js
 * @param {{ params: { id: string } }} context - The request context containing route parameters
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure
 */
export async function DELETE(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const { id } = context.params;

  try {
    await connectMongoDB();
    await StudySpot.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Study spot deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete study spot' }, { status: 500 });
  }
}

/**
 * Updates a study spot by its ID.
 *
 * @param {NextRequest} req - The HTTP request object from Next.js
 * @param {{ params: { id: string } }} context - The request context containing route parameters
 * @returns {Promise<NextResponse>} A JSON response with the updated study spot or an error message
 */
export async function PUT(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const { id } = context.params;
  const { name, description } = await req.json();

  try {
    await connectMongoDB();

    const updatedSpot = await StudySpot.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedSpot) {
      return NextResponse.json({ error: 'Spot not found' }, { status: 404 });
    }

    return NextResponse.json(updatedSpot, { status: 200 });
  } catch (error) {
    console.error('Error updating spot:', error);
    return NextResponse.json({ error: 'Failed to update study spot' }, { status: 500 });
  }
}
