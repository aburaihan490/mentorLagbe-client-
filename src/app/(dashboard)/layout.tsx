'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, LogOut, UserCog } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';

type UserRole = 'student' | 'tutor' | 'admin';

const roleConfig: Record<
    UserRole,
    { label: string; settingsHref: string; badgeClass: string }
> = {
    student: {
        label: 'Student',
        settingsHref: '/dashboard/settings',
        badgeClass: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
    },
    tutor: {
        label: 'Tutor',
        settingsHref: '/tutor/settings',
        badgeClass: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    },
    admin: {
        label: 'Admin',
        settingsHref: '/admin/settings',
        badgeClass: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user as
        | {
              name?: string | null;
              email?: string | null;
              image?: string | null;
              role?: UserRole;
          }
        | undefined;

    // Better Auth stores roles as "Student"/"Tutor"; normalize for the config.
    const normalizedRole = (user?.role ?? '').toLowerCase() as UserRole;
    const activeRole: UserRole = roleConfig[normalizedRole]
        ? normalizedRole
        : 'student';
    const currentRoleInfo = roleConfig[activeRole] ?? roleConfig.student;
    const displayName = user?.name || 'User';

    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const segments = (pathname || '/dashboard').split('/').filter(Boolean);

    const formatSegment = (seg: string) =>
        seg.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in');
                    router.refresh();
                },
            },
        });
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-slate-50/50">
                <DashboardSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Top Header */}
                    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="-ml-1" />

                            {/* Breadcrumb (লিংক ছাড়া শুধু টেক্সট) */}
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {segments.map((segment, index) => {
                                        const isLast =
                                            index === segments.length - 1;

                                        return (
                                            <React.Fragment
                                                key={`${segment}-${index}`}
                                            >
                                                {index > 0 && (
                                                    <BreadcrumbSeparator />
                                                )}
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage
                                                        className={
                                                            isLast
                                                                ? 'font-medium text-slate-900'
                                                                : 'text-slate-500'
                                                        }
                                                    >
                                                        {formatSegment(segment)}
                                                    </BreadcrumbPage>
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-slate-600 hover:bg-slate-100"
                                aria-label="Notifications"
                            >
                                <Bell className="h-5 w-5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="rounded-full focus:outline-none">
                                    <Avatar className="h-9 w-9 cursor-pointer border border-slate-200">
                                        <AvatarImage
                                            src={user?.image ?? undefined}
                                            alt={displayName}
                                        />
                                        <AvatarFallback className="bg-emerald-600 text-xs font-semibold text-white">
                                            {initials || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-64 rounded-2xl p-2 shadow-lg"
                                >
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="px-2.5 py-2 font-normal">
                                            <div className="flex flex-col space-y-1.5">
                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    {displayName}
                                                </p>
                                                {user?.email && (
                                                    <p className="truncate text-xs text-slate-500">
                                                        {user.email}
                                                    </p>
                                                )}
                                                <div className="pt-0.5">
                                                    <Badge
                                                        variant="secondary"
                                                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${currentRoleInfo.badgeClass}`}
                                                    >
                                                        {currentRoleInfo.label}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.push(
                                                currentRoleInfo.settingsHref,
                                            )
                                        }
                                        className="cursor-pointer rounded-lg px-2.5 py-2 text-sm text-slate-700"
                                    >
                                        <UserCog className="mr-2 h-4 w-4 text-slate-500" />
                                        <span>Update Profile</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        disabled={isPending}
                                        className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium text-red-600 focus:bg-red-50 focus:text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Main Page Content */}
                    <main className="flex-1 p-4 md:p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;
