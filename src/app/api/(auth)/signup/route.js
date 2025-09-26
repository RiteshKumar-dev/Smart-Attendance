import { connectDB } from '@/lib/mongodb';
import User from '@/models/User.Model';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, confirmPassword } = await req.json();

    if (!email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: 'Passwords do not match' }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'Signup successful' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
