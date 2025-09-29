'use client';
import React, { useState } from 'react'; // Added useState
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Using useRouter for navigation
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const [notification, setNotification] = useState('');
  const isRegistrationDone = localStorage.getItem('RegistrationSuccess') === 'true';

  // Handler for opening the modal
  const handleLaunchClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    if (!isAuthenticated) {
      // ❌ No token → redirect to login
      router.push('/login');
      return;
    }
    if (!isRegistrationDone) {
      // ❌ Registration not done → show notification
      setNotification('⚠️ Please complete your registration before accessing dashboard.');
      setTimeout(() => setNotification(''), 3000); // 3 sec baad notification hat jayega
      return;
    }

    // ✅ If logged in → open role modal
    setShowRoleModal(true);
  };

  // Handler for selecting the role, storing it, and navigating
  const handleRoleSelect = (role) => {
    if (typeof window !== 'undefined') {
      // Store role in localStorage
      localStorage.setItem('userRole', role);
    }
    setShowRoleModal(false);
    // Navigate to the dashboard
    router.push('/dashboard');
  };

  // Role Selection Modal Component
  const RoleSelectionModal = () => {
    if (!showRoleModal) return null;

    return (
      // Modal Overlay
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 transition-opacity"
        aria-modal="true"
        role="dialog"
      >
        {/* Modal Panel */}
        <div className="bg-white p-6 sm:p-10 w-full max-w-md m-4 transform transition-all scale-100 ease-out duration-300">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 text-center">
            Select Your Role
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Please choose your role to access the relevant dashboard experience.
          </p>

          <div className="flex flex-col space-y-4">
            {/* Teacher Role Button */}
            <button
              onClick={() => handleRoleSelect('Teacher')}
              className="group flex items-center justify-center p-4 border border-indigo-300 rounded-xl shadow-lg 
                         bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[1.00]"
            >
              <span className="text-xl font-bold">
                <span role="img" aria-label="Teacher icon" className="mr-3 text-2xl">
                  🧑‍🏫
                </span>
                Teacher Access
              </span>
            </button>

            {/* Student Role Button */}
            <button
              onClick={() => handleRoleSelect('Student')}
              className="group flex items-center justify-center p-4 border border-gray-300 rounded-xl shadow-lg 
                         bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[1.00]"
            >
              <span className="text-xl font-bold">
                <span role="img" aria-label="Student icon" className="mr-3 text-2xl">
                  🧑‍🎓
                </span>
                Student View
              </span>
            </button>
          </div>

          {/* Close Button/Hint */}
          <button
            onClick={() => setShowRoleModal(false)}
            className="mt-6 w-full text-sm font-medium text-gray-500 hover:text-indigo-600 transition duration-150"
            aria-label="Close role selection dialog"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // The Home component now only renders the static hero content.
  return (
    <main className="bg-white">
      {/* 🔔 Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium">
          {notification}
        </div>
      )}
      {/* Role Selection Modal */}
      <RoleSelectionModal />

      {/* 2. Main Hero Content & Industry-Pro CTA Area */}
      <section className="py-16 sm:py-24 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* LEFT: Value Proposition */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              The Easiest Way to <span className="text-indigo-700">Track Attendance</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-lg">
              Save time, reduce absenteeism, and gain transparency—let automation handle daily
              presence so you can focus on results.
            </p>

            {/* Feature Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-base text-gray-900 font-medium">
              {[
                'One-tap digital roll calls',
                'Automated notifications & compliance',
                'Accurate, live analytics',
                'Bank-grade secure cloud',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start text-sm sm:text-base">
                  <svg
                    className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {text}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-5">
              {/* MODIFIED: Changed Link to use handleLaunchClick and is now a button */}
              <button
                onClick={handleLaunchClick}
                className="inline-flex items-center justify-center px-9 py-4 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-indigo-700 hover:bg-indigo-800 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Launch Dashboard
                <svg className="ml-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 000 2h6a1 1 0 100-2H5zM4 12a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 000 2h6a1 1 0 100-2H5z" />
                </svg>
              </button>

              <Link href="/RegistrationForm" legacyBehavior>
                <a className="inline-flex items-center px-9 py-4 border border-gray-300 text-lg font-medium rounded-full shadow-md text-gray-900 bg-white hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  Registration
                </a>
              </Link>
            </div>
          </div>

          {/* RIGHT: Visual Feature Cards (Big screens) or Image (Mobile) */}
          <div className="order-1 md:order-2 flex flex-col space-y-6 lg:space-y-8 lg:block">
            {/* Big screens: highlight session features */}
            <div className="order-1 md:order-2 space-y-6 hidden lg:block">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition duration-500">
                <h3 className="font-bold text-lg text-indigo-600 mb-2">Biometric & QR Check-in</h3>
                <p className="text-sm text-gray-500">
                  Fast, secure, and touchless attendance logging for large groups.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition duration-500">
                <h3 className="font-bold text-lg text-green-600 mb-2">Automated Notifications</h3>
                <p className="text-sm text-gray-500">
                  Send instant alerts to parents/guardians for unexcused absences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition duration-500">
                <h3 className="font-bold text-lg text-yellow-600 mb-2">Historical Data Export</h3>
                <p className="text-sm text-gray-500">
                  Generate compliance-ready reports for any date range with one click.
                </p>
              </div>
            </div>

            {/* Mobile fallback: visual illustration */}
            <div className="flex justify-center lg:hidden">
              <div className="w-full max-w-xs">
                <Image
                  src="/SmartAttendanceImage.png"
                  alt="Attendance system illustration"
                  width={400}
                  height={400}
                  layout="responsive"
                  objectFit="contain"
                  className="rounded-3xl shadow-2xl border border-gray-50"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
