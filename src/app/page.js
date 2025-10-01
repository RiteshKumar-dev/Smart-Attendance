'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// NOTE: Assuming useAuthStore is available globally or imported correctly
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const [notification, setNotification] = useState('');
  const [isRegistrationDone, setIsRegistrationDone] = useState(false);

  // Custom Hook for mounting animation
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check registration status from localStorage
    const regStatus = localStorage.getItem('RegistrationSuccess') === 'true';
    setIsRegistrationDone(regStatus);
    setIsMounted(true); // For initial mount transition
  }, []);

  // Handler for opening the modal
  const handleLaunchClick = (e) => {
    e.preventDefault(); // Prevent default navigation

    if (!isAuthenticated) {
      // ❌ No token → redirect to login and show persistent error style
      setNotification('❌ You need to login first to access the dashboard.');
      setTimeout(() => router.push('/login'), 1500);
      return;
    }

    if (!isRegistrationDone) {
      // ❌ Registration not done → show notification
      setNotification('⚠️ Please complete your registration before accessing the dashboard.');
      setTimeout(() => setNotification(''), 4000); // 4 sec baad notification hat jayega
      return;
    }

    // ✅ If logged in & registered → open role modal
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

  // Role Selection Modal Component (Enhanced UI)
  const RoleSelectionModal = () => {
    if (!showRoleModal) return null;

    return (
      // Modal Overlay: Darkened, blurred background for better focus
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 transition-opacity backdrop-blur-sm"
        aria-modal="true"
        role="dialog"
      >
        {/* Modal Panel: Modern card design */}
        <div className="bg-white rounded-2xl shadow-3xl p-8 w-full max-w-sm m-4 transform transition-all scale-100 ease-out duration-300 border border-indigo-100">
          <div className="flex flex-col items-center">
            <svg
              className="h-10 w-10 text-indigo-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m-5 3h4m5 0h2m-2-6h2m-2-2h2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">
              Select Your Dashboard View
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Your role determines the features you can access.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Teacher Role Button - Primary Action Style */}
            <button
              onClick={() => handleRoleSelect('Teacher')}
              className="group flex items-center p-4 border border-indigo-500 rounded-xl shadow-md 
                         bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 transform hover:shadow-lg"
            >
              <span className="text-2xl mr-4" role="img" aria-label="Teacher icon">
                🧑‍🏫
              </span>
              <span className="text-lg font-bold">Teacher/Admin Access</span>
            </button>

            {/* Student Role Button - Secondary Action Style */}
            <button
              onClick={() => handleRoleSelect('Student')}
              className="group flex items-center p-4 border border-gray-300 rounded-xl shadow-md 
                         bg-white text-gray-800 hover:bg-gray-50 transition duration-300 transform hover:shadow-lg"
            >
              <span className="text-2xl mr-4" role="img" aria-label="Student icon">
                🧑‍🎓
              </span>
              <span className="text-lg font-bold">Student View Portal</span>
            </button>
          </div>

          <div className="border-t border-gray-100 mt-6 pt-4">
            <button
              onClick={() => setShowRoleModal(false)}
              className="w-full text-sm font-medium text-gray-500 hover:text-indigo-600 transition duration-150"
              aria-label="Close role selection dialog"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Determine notification style
  const notificationStyle = notification.includes('⚠️')
    ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
    : 'bg-red-100 text-red-700 border-red-400';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🔔 Floating Notification (Toast) */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium transition-all duration-300 ease-in-out border ${notificationStyle}`}
        >
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
              {/* Primary CTA: Launch Dashboard */}
              <button
                onClick={handleLaunchClick}
                className="inline-flex items-center justify-center px-9 py-4 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-indigo-700 hover:bg-indigo-800 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Launch Dashboard
                <svg className="ml-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 000 2h6a1 1 0 100-2H5zM4 12a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 000 2h6a1 1 0 100-2H5z" />
                </svg>
              </button>

              {/* Secondary CTA: Registration */}
              <Link
                href="/RegistrationForm"
                className="inline-flex items-center px-9 py-4 border border-gray-300 text-lg font-medium rounded-full shadow-md text-gray-900 bg-white hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Registration
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
                {/* NOTE: You should replace the placeholder image path /SmartAttendanceImage.png 
                         with a real, relevant illustration in your project. */}
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
