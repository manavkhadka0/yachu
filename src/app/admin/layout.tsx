"use client";
import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/sidebar/app-sidebar';
import { AdminAuthWrapper } from '@/components/admin/admin-auth-wrapper';
import { AdminHeader } from '@/components/admin/admin-header';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AdminAuthWrapper>
      {isLoginPage ? (
        <div className="min-h-screen">
          {children}
        </div>
      ) : (
        
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-auto bg-background">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      )}
    </AdminAuthWrapper>
  );
}