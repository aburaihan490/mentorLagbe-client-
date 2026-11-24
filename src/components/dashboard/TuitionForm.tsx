'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Loader2 } from 'lucide-react';
import type { ITuition } from '@/types/tuition';
import {
    fieldClass,
    labelClass,
    primaryButtonClass,
    secondaryButtonClass,
    textareaClass,
} from './form-styles';

export interface TuitionFormPayload {
    title: string;
    subject: string;
    classLevel: string;
    mode: 'Online' | 'Offline';
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    description: string;
    bannerImage: string;
}

const getInitialForm = (data?: ITuition | null) => ({
    title: data?.title ?? '',
    subject: data?.subject ?? '',
    classLevel: data?.classLevel ?? '',
    mode: (data?.mode ?? 'Online') as 'Online' | 'Offline',
    location: data?.location ?? '',
    monthlyFee: data ? String(data.monthlyFee) : '',
    daysPerWeek: data ? String(data.daysPerWeek) : '3',
    description: data?.description ?? '',
});

const TuitionForm = ({
    initialData,
    submitLabel = 'Post Tuition',
    isSubmitting = false,
    onSubmit,
    onCancel,
}: {
    initialData?: ITuition | null;
    submitLabel?: string;
    isSubmitting?: boolean;
    onSubmit: (payload: TuitionFormPayload) => Promise<void>;
    onCancel?: () => void;
}) => {
    const [form, setForm] = useState(getInitialForm(initialData));
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(initialData?.bannerImage ?? '');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const setField = (key: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [key]: value }));

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setError('');

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError('Banner image must be smaller than 2MB.');
            return;
        }

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (
            !form.title.trim() ||
            !form.subject.trim() ||
            !form.classLevel.trim() ||
            !form.location.trim() ||
            !form.description.trim()
        ) {
            setError('Please fill in all required fields.');
            return;
        }
        if (!preview) {
            setError('Please select a banner image.');
            return;
        }

        try {
            let bannerImage = initialData?.bannerImage ?? '';

            if (imageFile) {
                setUploading(true);

                const uploadData = new FormData();
                uploadData.append('image', imageFile);

                const uploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEDB_URL}`;
                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    body: uploadData,
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.error?.message ?? 'Banner image upload failed.',
                    );
                }

                bannerImage = result.data.url as string;
            }

            await onSubmit({
                title: form.title.trim(),
                subject: form.subject.trim(),
                classLevel: form.classLevel.trim(),
                mode: form.mode,
                location: form.location.trim(),
                monthlyFee: Number(form.monthlyFee),
                daysPerWeek: Number(form.daysPerWeek),
                description: form.description.trim(),
                bannerImage,
            });
        } catch (uploadError) {
            setError(
                uploadError instanceof Error
                    ? uploadError.message
                    : 'Something went wrong. Please try again.',
            );
        } finally {
            setUploading(false);
        }
    };

    const busy = uploading || isSubmitting;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </p>
            )}

            <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                    <label className={labelClass} htmlFor="tuition-title">
                        Tuition Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="tuition-title"
                        className={fieldClass}
                        placeholder="e.g. Advanced Mathematics for Class 12"
                        value={form.title}
                        onChange={(event) =>
                            setField('title', event.target.value)
                        }
                        disabled={busy}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="tuition-subject">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="tuition-subject"
                        className={fieldClass}
                        placeholder="e.g. Mathematics"
                        value={form.subject}
                        onChange={(event) =>
                            setField('subject', event.target.value)
                        }
                        disabled={busy}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="tuition-class">
                        Class Level <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="tuition-class"
                        className={fieldClass}
                        placeholder="e.g. Class 10 / University"
                        value={form.classLevel}
                        onChange={(event) =>
                            setField('classLevel', event.target.value)
                        }
                        disabled={busy}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="tuition-mode">
                        Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="tuition-mode"
                        className={fieldClass}
                        value={form.mode}
                        onChange={(event) =>
                            setField('mode', event.target.value)
                        }
                        disabled={busy}
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass} htmlFor="tuition-location">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="tuition-location"
                        className={fieldClass}
                        placeholder="e.g. Dhaka, Bangladesh / Online"
                        value={form.location}
                        onChange={(event) =>
                            setField('location', event.target.value)
                        }
                        disabled={busy}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="tuition-fee">
                        Monthly Fee (৳) <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="tuition-fee"
                        type="number"
                        min="1"
                        className={fieldClass}
                        placeholder="e.g. 5000"
                        value={form.monthlyFee}
                        onChange={(event) =>
                            setField('monthlyFee', event.target.value)
                        }
                        disabled={busy}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="tuition-days">
                        Days / Week <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="tuition-days"
                        type="number"
                        min="1"
                        max="7"
                        className={fieldClass}
                        value={form.daysPerWeek}
                        onChange={(event) =>
                            setField('daysPerWeek', event.target.value)
                        }
                        disabled={busy}
                        required
                    />
                </div>
            </div>

            <div>
                <label className={labelClass} htmlFor="tuition-description">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="tuition-description"
                    className={textareaClass}
                    placeholder="Describe the tuition, your teaching approach and what students will learn..."
                    value={form.description}
                    onChange={(event) =>
                        setField('description', event.target.value)
                    }
                    disabled={busy}
                    required
                />
            </div>

            <div>
                <label className={labelClass} htmlFor="tuition-banner">
                    Banner Image <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 sm:flex-row sm:items-center">
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:w-44">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Banner preview"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                                <ImagePlus className="h-7 w-7" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <label
                            htmlFor="tuition-banner"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <ImagePlus className="h-4 w-4" />
                            Choose image
                        </label>
                        <input
                            id="tuition-banner"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={busy}
                        />
                        <p className="mt-2 text-xs text-slate-500">
                            {imageFile
                                ? imageFile.name
                                : 'Upload a banner image (max 2MB). Leave empty to keep the current image when editing.'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
                <button
                    type="submit"
                    className={primaryButtonClass}
                    disabled={busy}
                >
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                    {uploading ? 'Uploading image...' : submitLabel}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className={secondaryButtonClass}
                        disabled={busy}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TuitionForm;
