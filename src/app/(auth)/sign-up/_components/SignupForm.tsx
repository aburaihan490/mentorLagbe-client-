'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Role = 'student' | 'tutor';

const SignupForm = () => {
    const router = useRouter();
    const imageRef = useRef<HTMLInputElement>(null);
    const [role, setRole] = useState<Role>('student');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file) {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }

            setPreviewImage(URL.createObjectURL(file));
            setImageName(file.name);
        }
    };

    const handleRemoveImage = () => {
        if (previewImage) {
            URL.revokeObjectURL(previewImage);
        }

        setPreviewImage(null);
        setImageName('');

        if (imageRef.current) {
            imageRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Form Data
            const formData = new FormData(e.currentTarget);
            const rawData = Object.fromEntries(formData.entries());

            // Image Validation
            const imageFile = formData.get('image') as File;

            if (
                !imageFile ||
                imageFile.size === 0 ||
                imageFile.size > 2 * 1024 * 1024
            ) {
                throw new Error('Please select an image under 2MB');
            }

            // Image Upload
            const uploadData = new FormData();
            uploadData.append('image', imageFile);

            const imageBB = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEDB_URL}`;

            const res = await fetch(imageBB, {
                method: 'POST',
                body: uploadData,
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(result.error?.message || 'Image upload failed');
            }

            const imageUrl = result.data.url;

            // Payload
            const payload = {
                fullName: String(rawData.fullName || '').trim(),
                email: String(rawData.email || '')
                    .trim()
                    .toLowerCase(),
                password: String(rawData.password || ''),
                role: rawData.role as Role,
            };

            // Better Auth User Create
            const { data, error } = await authClient.signUp.email({
                name: payload.fullName,
                email: payload.email,
                password: payload.password,
                image: imageUrl,
                role: payload.role,
            });

            if (error) {
                throw new Error(error.message);
            }

            // Success Toast
            toast.success('Account created successfully!');
            router.push('/sign-in');
            router.refresh();
        } catch (error) {
            console.log('sign-up', error);
            //error instanceof Error → চেক করছে error টি JavaScript-এর Error object কিনা।
            // error.message → Error-এর আসল message দেখাচ্ছে।
            // Something went wrong! → Error object না হলে fallback message দেখাচ্ছে।
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong!',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Profile Image Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Picture
                </label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                    {/* Image Preview */}
                    <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden bg-gray-100 border">
                        {previewImage ? (
                            <Image
                                width={50}
                                height={50}
                                src={previewImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="text-xl">👤</span>
                            </div>
                        )}
                    </div>

                    {/* Change Image Button */}
                    <label
                        htmlFor="image"
                        className="shrink-0 cursor-pointer flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <span>↑</span>
                        Change Image
                    </label>

                    {/* File Name */}
                    <span className="text-sm text-gray-500 truncate flex-1 min-w-0">
                        {imageName || 'No image selected'}
                    </span>

                    {/* Remove Image */}
                    {previewImage && (
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="shrink-0 p-2 text-gray-400 hover:text-red-500 transition"
                            title="Remove image"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M8 6V4h8v2" />
                                <path d="M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                            </svg>
                        </button>
                    )}

                    {/* Hidden File Input */}
                    <input
                        ref={imageRef}
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
            </div>
            {/* Full Name Input */}
            <div>
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Full Name
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            {/* Email Input */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            {/* Password Input */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="Minimum 6 characters"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            {/* Role Selection Input ('Student' or 'Tutor') */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Role
                </label>
                {/* FormData-তে role পাঠানোর জন্য hidden input */}
                <input type="hidden" name="role" value={role} />

                <div className="grid grid-cols-2 gap-3">
                    {(['student', 'tutor'] as Role[]).map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setRole(item)}
                            className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition flex items-center justify-center gap-2 ${
                                role === item
                                    ? 'bg-green-50 border-green-600 text-green-700 ring-1 ring-green-600'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span>{item === 'student' ? '🎓' : '👨‍🏫'}</span>
                            <span>{item}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition duration-200 disabled:opacity-50"
            >
                {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link
                    href="/sign-in"
                    className="text-green-600 font-medium hover:underline"
                >
                    Sign In করুন
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
