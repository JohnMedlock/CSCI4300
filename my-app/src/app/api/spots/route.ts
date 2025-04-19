import connectMongoDB from "../../../config/mongodb";
import StudySpot from "../../../models/StudySpot";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const spots = await StudySpot.find();
    return NextResponse.json({ spots });
}

export async function POST(request: NextRequest) {
    const { name, description, address, coordinates = { lat: 0, lng: 0 }, tags = [], image } = await request.json();
    await connectMongoDB();
    await StudySpot.create({ name, description, address, coordinates, tags, image });
    return NextResponse.json({ message: "Study spot added successfully" }, { status: 201 });        
}
