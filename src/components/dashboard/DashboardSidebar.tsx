'use client'; // Remove if using plain React / Vite

import Link from 'next/link'; // Or use `<a>` / react-router `<Link>` if not using Next.js
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
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
// adjust path to your navItemsByRole
import { UserRole } from '@/types/user'; // adjust path to your types
import { authClient } from '@/lib/auth-client'; // adjust path to your Better Auth client
import { navItemsByRole } from '@/lib/dashboard-menu';

interface DashboardSidebarProps {
    /** Optional fallback/override role if not coming directly from Better Auth session */
    role?: UserRole;
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();

    // Better Auth session hook
    const { data: session, isPending } = authClient.useSession();

    // Determine role (adjust `session?.user?.role` if you map custom fields differently in Better Auth)
    const sessionRole = (session?.user as { role?: UserRole } | undefined)
        ?.role;
    const activeRole: UserRole = role ?? sessionRole ?? 'student';

    const items = navItemsByRole[activeRole] ?? navItemsByRole.student;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login'); // or '/'
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
                    {/* Replace with your MentorLagbe logo/icon */}
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
                                // Exact match for root role dashboards, startsWith for subpages
                                const isRootRoute =
                                    item.href === '/dashboard' ||
                                    item.href === '/tutor' ||
                                    item.href === '/admin';

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

                            {/* Logout button matching the screenshot placement */}
                            <SidebarMenuItem className="pt-1">
                                <SidebarMenuButton
                                    onClick={handleLogout}
                                    disabled={isPending}
                                    className="h-11 rounded-xl px-4 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
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
