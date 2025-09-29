import { connectDB } from '@/lib/mongodb';
import Student from '@/models/Student.Model';
import Teacher from '@/models/Teacher.Model';

export async function POST(req) {
  try {
    await connectDB();

    const { email, role } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    let students = [];
    let teachers = [];

    if (role === 'Teacher') {
      teachers = await Teacher.find({ email }).select('-password -token');
    } else if (role === 'Student') {
      students = await Student.find({ email }).select('-password -token');
    } else {
      // Agar role pass nahi hua, dono me search karenge
      students = await Student.find({ email }).select('-password -token');
      teachers = await Teacher.find({ email }).select('-password -token');
    }

    if (students.length === 0 && teachers.length === 0) {
      return new Response(JSON.stringify({ error: 'No student or teacher found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        students,
        teachers,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
