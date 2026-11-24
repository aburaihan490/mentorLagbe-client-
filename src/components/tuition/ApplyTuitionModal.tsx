'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';

interface ApplyTuitionModalProps {
    isOpen: boolean;
    onClose: () => void;
    tuitionId: string;
    tuitionTitle: string;
    tutorEmail: string;
    server_url: string | undefined;
}

export default function ApplyTuitionModal({
    server_url,
    isOpen,
    onClose,
    tuitionId,
    tuitionTitle,
    tutorEmail,
}: ApplyTuitionModalProps) {
    const { data: session } = authClient.useSession();

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // await করার আগেই form reference নাও
        const form = e.currentTarget;

        try {
            setLoading(true);

            // FormData আগে তৈরি করো
            const formData = new FormData(form);

            const formValues = Object.fromEntries(formData.entries());

            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                throw new Error(error?.message || 'Token not found');
            }

            const jwtToken = data.token;

            const payload = {
                tuitionId,
                tutorEmail,
                studentId: session?.user?.id,
                studentName: session?.user?.name,
                studentEmail: session?.user?.email,
                studentPhone: formValues.phone,
                studentNote: formValues.note,
                preferredSchedule: formValues.preferredSchedule,
            };

            const response = await fetch(
                `${server_url}/applications/student-application`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify(payload),
                },
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Application failed');
            }

            toast.success('Application submitted successfully!');

            form.reset();
            onClose();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Something went wrong',
            );
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-99 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="my-auto w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Apply for Tuition
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {tuitionTitle}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Fixed Student Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Student Name
                        </label>

                        <input
                            type="text"
                            value={session?.user?.name || ''}
                            readOnly
                            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                        />
                    </div>

                    {/* Fixed Student Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Student Email
                        </label>

                        <input
                            type="email"
                            value={session?.user?.email || ''}
                            readOnly
                            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Phone Number
                        </label>

                        <input
                            name="phone"
                            type="tel"
                            required
                            placeholder="01XXXXXXXXX"
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Preferred Schedule */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Preferred Schedule
                        </label>

                        <input
                            name="preferredSchedule"
                            type="text"
                            placeholder="e.g. Weekdays 5 PM - 7 PM"
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Note */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Note
                        </label>

                        <textarea
                            name="note"
                            rows={3}
                            placeholder="Write something about yourself..."
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 rounded-lg border py-3 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 rounded-lg bg-blue-600 py-3 font-semibold text-white disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body,
    );
}
