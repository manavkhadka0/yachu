"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, AlertCircle, Shield } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}

interface AuthCheckResult {
  isValid: boolean;
  shouldRedirect: boolean;
}

export default function AdminLogin() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    const checkExistingAuth = (): AuthCheckResult => {
      try {
        const authStatus: string | null = localStorage.getItem('adminAuthenticated');
        const authTime: string | null = localStorage.getItem('adminAuthTime');
        const currentTime: number = Date.now();
        
        // Check if auth is valid and not expired
        const SESSION_TIMEOUT: number = 8 * 60 * 60 * 1000; // 8 hours
        const isValidAuth: boolean = authStatus === 'true' && 
                           authTime !== null && 
                           (currentTime - parseInt(authTime)) < SESSION_TIMEOUT;

        if (isValidAuth) {
          router.push('/admin/orders');
          return { isValid: true, shouldRedirect: true };
        }
        
        return { isValid: false, shouldRedirect: false };
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminAuthTime');
        localStorage.removeItem('adminUser');
        return { isValid: false, shouldRedirect: false };
      }
    };

    checkExistingAuth();
  }, [router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate input
      if (!formData.email.trim() || !formData.password.trim()) {
        setError('Please fill in all fields');
        return;
      }

      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Use environment variables instead of hardcoded credentials
      if (formData.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && formData.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        const currentTime: number = Date.now();

        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminAuthTime', currentTime.toString());
        localStorage.setItem('adminUser', formData.email);

        setFormData({ email: '', password: '' });

        router.push('/admin/orders');
      } else {
        setError('Invalid credentials. Please check your email and password.');
 
        console.warn('Failed login attempt:', {
          email: formData.email,
          timestamp: new Date().toISOString(),
          ip: 'client-side' 
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !isLoading) {
      // Create a synthetic form event for handleLogin
      const form = e.currentTarget.form;
      if (form) {
        const syntheticEvent = new Event('submit', { bubbles: true, cancelable: true });
        Object.defineProperty(syntheticEvent, 'target', { value: form });
        Object.defineProperty(syntheticEvent, 'currentTarget', { value: form });
        handleLogin(syntheticEvent as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Admin Portal</CardTitle>
            <CardDescription>
              Secure access to admin panel
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.email.trim() || !formData.password.trim()}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Footer Warning */}
          <Alert >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Authorized personnel only. All access is monitored.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};