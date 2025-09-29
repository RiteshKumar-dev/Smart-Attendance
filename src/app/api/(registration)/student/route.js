import { connectDB } from '@/lib/mongodb';
import Student from '@/models/Student.Model';

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const student = new Student(body);
    await student.save();

    return new Response(JSON.stringify({ message: 'Student registered successfully!' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error registering student' }), { status: 500 });
  }
}
