'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UserRole } from '@/types/user';
import { authClient } from '@/lib/auth-client';
import { navItemsByRole } from '@/lib/dashboard-menu';

interface DashboardSidebarProps {
    role?: UserRole;
}

const getRoleFromPathname = (pathname: string | null): UserRole | undefined => {
    if (!pathname) return undefined;
    if (pathname.startsWith('/tutor')) return 'tutor';
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/student')) return 'student';
    return undefined;
};

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    // Case-insensitive & safe role extraction (supports 'tutor', 'TUTOR', etc.)
    const rawSessionRole = (
        session?.user as { role?: string } | undefined
    )?.role?.toLowerCase() as UserRole | undefined;

    const pathRole = getRoleFromPathname(pathname);

    // Priority: explicit prop -> session role -> URL path role -> default 'student'
    const activeRole: UserRole =
        role ?? rawSessionRole ?? pathRole ?? 'student';

    const items = navItemsByRole[activeRole] ?? navItemsByRole.student;

    const handleLogout = async () => {
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
        <Sidebar className="border-r bg-white">
            {/* Brand Header */}
            <SidebarHeader className="px-5 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image width={50} height={50} src="/logo.png" alt="logo" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">
                        Mentor<span className="text-emerald-600">Lagbe</span>
                    </span>
                </Link>
            </SidebarHeader>

            {/* Navigation Items + Logout */}
            <SidebarContent className="px-3 py-2">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => {
                                const Icon = item.icon;
                                const isRootRoute =
                                    item.href === '/student/dashboard' ||
                                    item.href === '/tutor/dashboard' ||
                                    item.href === '/admin/dashboard';

                                const isActive = isRootRoute
                                    ? pathname === item.href
                                    : pathname === item.href ||
                                      pathname?.startsWith(`${item.href}/`);

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3"
                                        >
                                            <SidebarMenuButton
                                                isActive={isActive}
                                                className={`${
                                                    isActive
                                                        ? 'h-11 rounded-xl bg-emerald-600 px-4 font-semibold text-white shadow-sm hover:bg-emerald-600 hover:text-white'
                                                        : 'h-11 rounded-xl px-4 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                                } cursor-pointer`}
                                            >
                                                <Icon
                                                    className={`h-4 w-4 shrink-0 ${
                                                        isActive
                                                            ? 'text-white'
                                                            : 'text-slate-700'
                                                    }`}
                                                />
                                                <span>{item.name}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                );
                            })}

                            {/* Logout button */}
                            <SidebarMenuItem className="pt-1">
                                <SidebarMenuButton
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={isPending}
                                    className="h-11 cursor-pointer rounded-xl px-4 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <LogOut className="h-4 w-4 shrink-0 text-slate-700" />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    );
};

export default DashboardSidebar;
