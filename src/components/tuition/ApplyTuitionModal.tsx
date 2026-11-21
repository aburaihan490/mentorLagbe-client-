'use client';

import { useState } from 'react';

interface ApplyTuitionModalProps {
    isOpen: boolean;
    onClose: () => void;
    tuitionId: string;
    tuitionTitle: string;
}

export default function ApplyTuitionModal({
    isOpen,
    onClose,
    tuitionId,
    tuitionTitle,
}: ApplyTuitionModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        qualification: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tuitionId,
                    ...formData,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Application failed');
            }

            alert('Application submitted successfully!');

            onClose();

            setFormData({
                name: '',
                email: '',
                phone: '',
                qualification: '',
                message: '',
            });
        } catch (error) {
            alert(
                error instanceof Error ? error.message : 'Something went wrong',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
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
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Enter your name"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            placeholder="Enter your email"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Phone Number
                        </label>
                        <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                            placeholder="01XXXXXXXXX"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Educational Qualification
                        </label>
                        <input
                            required
                            type="text"
                            value={formData.qualification}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    qualification: e.target.value,
                                })
                            }
                            placeholder="e.g. HSC / BSc"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message: e.target.value,
                                })
                            }
                            placeholder="Write something about yourself..."
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 rounded-lg border py-3 font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
