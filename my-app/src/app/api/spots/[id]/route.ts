import connectMongoDB from "../../../../../config/mongodb";
import StudySpot from "../../../../../models/StudySpot";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: {id: string};
}

export async function GET(request: NextRequest, {params}: RouteParams) {
    const {id} = await params;
    await connectMongoDB();
    const spot = await StudySpot.findOne({_id: id});
    return NextResponse.json({spot}, {status: 200});
}

export async function PUT(request: NextRequest, {params}: RouteParams) {
    const {id} = await params;
    const { name, description, address, coordinates, tags, image } = await request.json();
    await connectMongoDB();
    await StudySpot.findByIdAndUpdate(id, {name, description, address, coordinates, tags, image});
    return NextResponse.json({message: "Study spot updated"}, {status: 200});
}

export async function DELETE(request: NextRequest, {params}: RouteParams) {
    const {id} = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID Format"}, {status: 400});
    }

    await connectMongoDB();
    const deletedSpot = await StudySpot.findByIdAndDelete(id);

    if (!deletedSpot) {
        return NextResponse.json({message: "Study spot not found"}, {status: 404});
    }

    return NextResponse.json({message: "Study spot deleted"}, {status: 200});
}
