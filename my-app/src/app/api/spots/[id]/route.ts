import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import StudySpot from '@/models/StudySpot'; // Adjust path if necessary
import connectMongoDB from '@/config/mongodb';

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
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

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
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
