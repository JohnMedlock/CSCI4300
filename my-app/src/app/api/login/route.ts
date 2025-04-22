import { NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * Handles user login via POST request.
 *
 * @param {Request} req - The HTTP request object from Next.js
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure
 */
export async function POST(req: Request): Promise<NextResponse> {
  // Extract username and password from the request body
  const { username, password } = await req.json();

  // Connect to the MongoDB database
  await connectMongoDB();

  // Find the user by username
  const user = await User.findOne({ username });

  // Return 404 if user is not found
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Compare the submitted password with the hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  // Return 401 if password does not match
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Return success response with user info (excluding sensitive fields)
  return NextResponse.json({
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

