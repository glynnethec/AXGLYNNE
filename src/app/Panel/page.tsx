'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import Header from '@/app/components/Header';
import AssemblyDashboard from './components/AssemblyDashboard';

export default function PanelPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    checkUser();
  }, [router]);

  if (!isAuthenticated) return null; // Prevent flash of dashboard before redirect
  return (
    <>
      <Header />
      <AssemblyDashboard />
    </>
  );
}
