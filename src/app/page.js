import Image from 'next/image';
import Link from 'next/link';

const SMART_ATTENDANCE_IMAGE_PATH = '/smart-attendance-hero.png';

export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
            Effortless <span className="text-indigo-600">Attendance</span> Tracking
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
            Automate daily rolls, save time, and gain instant insights into student and staff
            presence with our smart system.
          </p>

          <div className="pt-4">
            <Link href="/dashboard" passHref legacyBehavior>
              <a className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                Go to Dashboard
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0zm5.293-2.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-lg">
            <Image
              src="/SmartAttendanceImage.png"
              alt="Cartoon students using a Smart Attendance app on a large smartphone"
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
