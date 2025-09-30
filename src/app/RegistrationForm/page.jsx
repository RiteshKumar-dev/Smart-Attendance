'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// NOTE: Assuming '@/components/ui/button', '@/components/ui/input', '@/components/ui/label' exist
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';

// Placeholder for API interaction (as we cannot execute real API calls)
const mockSubmit = async (data, role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.name.toLowerCase().includes('error')) {
        reject({
          response: { data: { error: 'Registration failed due to server error. Try again.' } },
        });
      } else {
        resolve({ data: { message: 'Registration successful! Redirecting to...' } });
      }
    }, 1500);
  });
};

export default function RegisterPage() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [teacherSubjects, setTeacherSubjects] = useState(['']);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  // Reset form fields on role change
  const handleBack = () => {
    setRole(null);
    setMessage('');
    setTeacherSubjects(['']);
  };

  // Handle subjects for teacher form
  const handleSubjectChange = (index, value) => {
    const updated = [...teacherSubjects];
    updated[index] = value;
    setTeacherSubjects(updated);
  };

  const addSubject = () => setTeacherSubjects([...teacherSubjects, '']);
  const removeSubject = (index) => {
    const updated = teacherSubjects.filter((_, i) => i !== index);
    setTeacherSubjects(updated.length > 0 ? updated : ['']); // Ensure at least one input field remains
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Get form data from event target
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let payload;
    let endpointRole;

    if (role === 'teacher') {
      endpointRole = 'teacher';
      payload = {
        name: data.name,
        teacherId: data.teacherId,
        email: data.email,
        subjects: teacherSubjects.filter((s) => s.trim() !== ''),
      };
    } else {
      endpointRole = 'student';
      payload = {
        name: data.name,
        email: data.email,
        rollNo: data.rollNo,
        enrollmentNo: data.enrollmentNo,
        semester: data.semester,
        year: data.year,
        section: data.section,
        domain: data.domain,
      };
    }

    try {
      // Replaced actual axios call with mockSubmit
      const res = await mockSubmit(payload, endpointRole);
      setMessage(res.data.message);

      // Clear form after successful submission
      e.target.reset();
      setTeacherSubjects(['']);

      // Redirect after a short delay to allow message to be seen
      localStorage.setItem('RegistrationSuccess', 'true');
      if (isAuthenticated) {
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setTimeout(() => router.push('/login'), 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Role Selection Card Component
  const RoleCard = ({ roleName, description, icon, onSelect }) => (
    <div
      onClick={onSelect}
      className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg 
                 hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 cursor-pointer w-full"
    >
      <span className="text-4xl mb-3 text-indigo-600">{icon}</span>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{roleName}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
        {/* Step 1: Role Selection */}
        {!role ? (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">Get Started</h1>
            <p className="text-gray-600 text-center -mt-4">
              Please tell us if you are a Teacher or a Student to proceed with registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <RoleCard
                roleName="Teacher"
                description="Manage classes, mark attendance, and view reports."
                icon="🧑‍🏫"
                onSelect={() => setRole('teacher')}
              />
              <RoleCard
                roleName="Student"
                description="View attendance history and personal information."
                icon="🧑‍🎓"
                onSelect={() => setRole('student')}
              />
            </div>

            {/* <div className="text-center text-sm text-gray-500 mt-4">
              Already registered?
              <Link href="/login" legacyBehavior>
                <a className="text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-4 ml-1">
                  Login here
                </a>
              </Link>
            </div> */}
          </div>
        ) : (
          /* Step 2: Registration Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="self-start text-indigo-600 hover:text-indigo-800 text-sm mb-4 p-0 h-auto"
            >
              ← Back to Role Selection
            </Button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {role === 'teacher' ? 'Teacher Registration' : 'Student Registration'}
            </h2>

            {/* General Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@institution.edu"
                  required
                />
              </div>
            </div>

            {/* Conditional Fields (Teacher) */}
            {role === 'teacher' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="teacherId">Official Teacher ID</Label>
                  <Input id="teacherId" name="teacherId" placeholder="T-1001" required />
                </div>

                {/* Subjects Input Array */}
                <div className="flex flex-col gap-3 p-4 border border-indigo-200 rounded-lg bg-indigo-50">
                  <Label className="font-semibold text-indigo-700">Subjects Taught</Label>
                  {teacherSubjects.map((subj, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Input
                        value={subj}
                        onChange={(e) => handleSubjectChange(i, e.target.value)}
                        placeholder={`Subject ${i + 1} (e.g., Mathematics)`}
                        required
                      />
                      {teacherSubjects.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSubject(i)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash-2"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSubject}
                    className="mt-2 w-full bg-white text-indigo-600 hover:bg-indigo-100 border-indigo-300"
                  >
                    + Add Another Subject
                  </Button>
                </div>
              </>
            )}

            {/* Conditional Fields (Student) */}
            {role === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input id="rollNo" name="rollNo" placeholder="20XX010" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="enrollmentNo">Enrollment No</Label>
                  <Input id="enrollmentNo" name="enrollmentNo" placeholder="U01XXXXX" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input id="semester" name="semester" type="number" min="1" max="8" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="year">Current Year</Label>
                  <Input id="year" name="year" type="number" min="2020" max="2030" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" name="section" placeholder="A / B / C" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="domain">Domain / Course</Label>
                  <div className="relative">
                    {/* Using basic select and styling it to match Input */}
                    <select
                      id="domain"
                      name="domain"
                      className="border border-gray-300 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                      required
                    >
                      <option value="" disabled>
                        Select Domain
                      </option>
                      <option value="BBA">BBA</option>
                      <option value="BCA">BCA</option>
                      <option value="BTech">BTech</option>
                      <option value="MTech">MTech</option>
                    </select>
                    {/* Custom Arrow Icon for select box */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button & Status */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 h-12 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </div>
              ) : (
                `Submit ${role === 'teacher' ? 'Teacher' : 'Student'} Details`
              )}
            </Button>

            {/* Message Display */}
            {message && (
              <p
                className={`text-center text-sm font-medium p-3 rounded-lg ${
                  message.includes('successful')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
