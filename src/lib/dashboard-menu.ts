import {
    LayoutGrid,
    FileText,
    Heart,
    CreditCard,
    UserCog,
    Users,
    BookOpen,
    Settings,
    BookBookmark,
} from 'lucide-react';

export const navItemsByRole = {
    student: [
        { name: 'Dashboard', href: '/student/dashboard', icon: LayoutGrid },
        {
            name: 'My Applications',
            href: '/student/my-applications',
            icon: FileText,
        },
        {
            name: 'Payments',
            href: '/student/payments',
            icon: CreditCard,
        },
        {
            name: 'Profile Settings',
            href: '/student/settings',
            icon: UserCog,
        },
    ],
    tutor: [
        { name: 'Dashboard', href: '/tutor/dashboard', icon: LayoutGrid },
        { name: 'My Listings', href: '/tutor/post-tuition', icon: BookOpen },
        { name: 'My Tuitions', href: '/tutor/my-tuitions', icon: BookBookmark },
        { name: 'Applications', href: '/tutor/applicants', icon: FileText },
        { name: 'Profile Settings', href: '/tutor/settings', icon: UserCog },
    ],
    admin: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Tuitions', href: '/admin/tuitions', icon: BookOpen },
        { name: 'Payments', href: '/admin/transactions', icon: CreditCard },
        // { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
};
