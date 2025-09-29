import { connectDB } from '@/lib/mongodb';
import User from '@/models/User.Model';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    // 🔹 Token generate
    const token = signToken({ id: user._id, email: user.email });

    // 🔹 Token DB me store
    user.token = token;
    await user.save();

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
