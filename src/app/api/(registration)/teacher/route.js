import { connectDB } from '@/lib/mongodb';
import Teacher from '@/models/Teacher.Model';

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const teacher = new Teacher(body);
    await teacher.save();

    return new Response(JSON.stringify({ message: 'Teacher registered successfully!' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error registering teacher' }), { status: 500 });
  }
}
