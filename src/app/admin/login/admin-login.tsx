"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import posthog from "posthog-js";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

        // Track successful admin login with PostHog
        posthog.capture("admin_login_success", {
          admin_email: formData.email,
        });

        // Identify admin user
        posthog.identify(formData.email, {
          email: formData.email,
          role: "admin",
        });

        setFormData({ email: '', password: '' });

        router.push('/admin/orders');
      } else {
        setError('Invalid credentials. Please check your email and password.');

        // Track failed admin login attempt with PostHog
        posthog.capture("admin_login_failed", {
          attempted_email: formData.email,
        });

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6">
      <Card className="w-full max-w-md rounded-2xl border border-border bg-card shadow-none">
        <CardHeader className="space-y-1.5 text-center px-6 pt-8 pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-2">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 text-left">
              <Label
                htmlFor="email"
                className="block text-left text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 md:h-12 w-full rounded-xl border-input bg-background px-4 text-base shadow-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                required
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2 text-left">
              <Label
                htmlFor="password"
                className="block text-left text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 md:h-12 w-full rounded-xl border-input bg-background pl-4 pr-12 sm:pr-12 text-base shadow-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground cursor-pointer focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="rounded-xl shadow-none">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.email.trim() || !formData.password.trim()}
              className="h-12 md:h-12 w-full cursor-pointer rounded-xl bg-forest text-base font-medium text-white shadow-none transition-all hover:bg-forest/90 active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer Warning */}
          <p className="pt-6 text-center text-xs text-muted-foreground">
            Authorized personnel only. All access is monitored.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};