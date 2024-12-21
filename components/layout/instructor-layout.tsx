"use client";

import { useInstructorAuth } from "@/lib/auth/hooks/use-instructor-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart2,
  Settings,
  Loader2,
} from "lucide-react";

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export function InstructorLayout({ children }: InstructorLayoutProps) {
  const { isLoading, isAuthorized } = useInstructorAuth();

  if (isLoading || isAuthorized === null) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/instructor/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Kursus Saya",
      href: "/instructor/courses",
      icon: BookOpen,
    },
    {
      name: "Siswa",
      href: "/instructor/students",
      icon: Users,
    },
    {
      name: "Analisis",
      href: "/instructor/analytics",
      icon: BarChart2,
    },
    {
      name: "Pengaturan",
      href: "/instructor/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="hidden w-64 flex-shrink-0 border-r bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container py-8">{children}</div>
      </div>
    </div>
  );
}
