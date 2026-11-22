'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { AvatarWithUpload } from '@/components/ui/AvatarWithUpload';
import { Button } from '@/components/ui/button';

const AdminSettingsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    const user = session?.user as
        | {
              name?: string | null;
              email?: string | null;
              image?: string | null;
              role?: 'student' | 'tutor' | 'admin';
          }
        | undefined;

    const activeRole = user?.role ?? 'admin';

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle avatar upload for admin
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (r) => {
                // Update state via parent re-render
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // TODO: Save admin settings to backend
        alert('Admin settings saved successfully!');
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login');
                    router.refresh();
                },
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <AvatarWithUpload
                    initialAvatarUrl={user?.image ?? undefined}
                    onFileSelect={handleFileSelect}
                    name={user?.name ?? ''}
                    onNameChange={() => {
                        // TODO: Update admin name via Better Auth API
                    }}
                    email={user?.email ?? ''}
                    disabled={isPending}
                />

                {/* Admin-specific sign out */}
                {activeRole !== 'student' && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            disabled={isPending}
                            className="w-full text-red-600 hover:text-red-800"
                        >
                            {isPending ? 'Signing out...' : 'Sign Out'}
                        </Button>
                    </div>
                )}

                <div className="mt-6">
                    <Button onClick={handleSave} disabled={isPending} className="w-full">
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;