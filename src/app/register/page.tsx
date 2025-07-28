'use client';
import React from 'react';
import Register from '@/app/register/register'; // ✅ relative import (not '@/')

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Register />
    </main>
  );
}
