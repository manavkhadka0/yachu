import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AdminHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return null;
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1 hover:bg-muted hover:text-primary" />
    </header>
  );
}