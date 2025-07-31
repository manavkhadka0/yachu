"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface AdminAuthWrapperProps {
  children: ReactNode;
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem('adminAuthenticated');
        const authTime = localStorage.getItem('adminAuthTime');
        const currentTime = Date.now();
        const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours

        const isValidAuth = Boolean(
          authStatus === 'true' && 
          authTime && 
          (currentTime - parseInt(authTime)) < SESSION_TIMEOUT
        );
        
        setIsAuthenticated(isValidAuth);

        if (!isLoginPage && !isValidAuth) {
          localStorage.removeItem('adminAuthenticated');
          localStorage.removeItem('adminAuthTime');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
        } else if (isLoginPage && isValidAuth) {
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        if (!isLoginPage) {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname, isLoginPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-8 h-8 border-4 border-muted rounded-full border-t-primary animate-spin"></div>
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-lg border text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">Access Denied</h2>
          <p className="mb-6 text-muted-foreground">You need to be logged in to access this page.</p>
          <Button 
            onClick={() => router.push('/admin/login')} 
            className="w-full text-white"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
