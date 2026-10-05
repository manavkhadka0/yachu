"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, AlertCircle, Shield } from "lucide-react";
import posthog from "posthog-js";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const authStatus = localStorage.getItem('adminAuthenticated');
        const authTime = localStorage.getItem('adminAuthTime');
        const currentTime = Date.now();

        const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours
        const isValidAuth = authStatus === 'true' &&
                           authTime !== null &&
                           (currentTime - parseInt(authTime)) < SESSION_TIMEOUT;

        if (isValidAuth) {
          router.push('/admin/orders');
          return { isValid: true, shouldRedirect: true };
        }

        return { isValid: false, shouldRedirect: false };
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminAuthTime');
        localStorage.removeItem('adminUser');
        return { isValid: false, shouldRedirect: false };
      }
    };

    checkExistingAuth();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.email.trim() || !formData.password.trim()) {
        setError('Please fill in all fields');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get env credentials with fallback
      const rawEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'yachu@gmail.com';
      const rawPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Yachu@321';

      // Defensively strip wrapping double or single quotes if present
      const adminEmail = rawEmail.replace(/^["']|["']$/g, '');
      const adminPassword = rawPassword.replace(/^["']|["']$/g, '');

      if (formData.email.trim() === adminEmail.trim() && formData.password === adminPassword) {
        const currentTime = Date.now();

        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminAuthTime', currentTime.toString());
        localStorage.setItem('adminUser', formData.email);

        try {
          posthog.capture("admin_login_success", {
            admin_email: formData.email,
          });

          posthog.identify(formData.email, {
            email: formData.email,
            role: "admin",
          });
        } catch (phErr) {
          console.warn("PostHog event failed:", phErr);
        }

        setFormData({ email: '', password: '' });
        router.push('/admin/orders');
      } else {
        setError('Invalid credentials. Please check your email and password.');

        try {
          posthog.capture("admin_login_failed", {
            attempted_email: formData.email,
          });
        } catch (phErr) {
          console.warn("PostHog event failed:", phErr);
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      const form = e.currentTarget.form;
      if (form) {
        handleLogin({ preventDefault: () => {} });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 text-foreground">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest text-cream">
            <Shield className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-foreground">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Secure access to admin panel
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 text-foreground bg-background border-border"
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
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 text-foreground bg-background border-border"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="border-destructive/30">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading || !formData.email.trim() || !formData.password.trim()}
              className="w-full bg-forest hover:bg-forest/90 text-white cursor-pointer"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
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

          <Alert className="border-border">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <AlertDescription className="text-xs text-muted-foreground">
              Authorized personnel only. All access is monitored.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
