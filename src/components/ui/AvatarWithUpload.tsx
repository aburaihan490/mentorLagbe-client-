'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Input } from './input';
import { Button } from './button';

interface AvatarWithUploadProps {
    /** Initial avatar image URL (from Better Auth session) */
    initialAvatarUrl?: string | null;
    /** Callback when user changes the avatar file */
    onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Current user's name */
    name?: string;
    /** Callback when name changes */
    onNameChange?: (name: string) => void;
    /** Current user's email */
    email?: string;
    /** Placeholder for name input */
    placeholderName?: string;
    /** Placeholder for email input */
    placeholderEmail?: string;
    /** Whether inputs are disabled (during pending operations) */
    disabled?: boolean;
}

const AvatarWithUpload: React.FC<AvatarWithUploadProps> = ({
    initialAvatarUrl,
    name,
    onNameChange,
    email,
    placeholderName = 'Full name',
    placeholderEmail = 'Email address',
    disabled = false,
}) => {
    // Initialize state: use provided URL or undefined
    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(
        initialAvatarUrl ?? null,
    );

    return (
        <div className="space-y-4">
            {/* Avatar */}
            <div>
                <Avatar className="w-20 h-20 mx-auto">
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt="Profile" />
                    ) : (
                        <AvatarFallback className="bg-emerald-600 text-xs font-semibold text-white">
                            {name ? name[0].toUpperCase() : 'U'}
                        </AvatarFallback>
                    )}
                </Avatar>
            </div>

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 gap-4">
                <Input
                    value={name ?? ''}
                    onChange={(e) => onNameChange?.(e.target.value)}
                    placeholder={placeholderName}
                    disabled={disabled}
                    className="mt-1 w-full"
                />

                <Input
                    value={email ?? ''}
                    type="email"
                    placeholder={placeholderEmail}
                    disabled
                    readOnly
                    className="mt-1 w-full"
                />
            </div>

            {/* Change Avatar Button */}
            <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full justify-center"
            >
                Change Avatar
            </Button>
        </div>
    );
};

export { AvatarWithUpload };
