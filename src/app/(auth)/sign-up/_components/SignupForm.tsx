'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Role = 'Student' | 'Tutor';

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    role?: string;
}

const SignupForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('Student');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    // Form Validation Logic
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Full Name Validation
        if (!fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        } else if (fullName.trim().length < 3) {
            newErrors.fullName = 'Full Name must be at least 3 characters';
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password Validation (Min 6 characters)
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        // Role Validation
        if (!role) {
            newErrors.role = 'Please select a role';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Default subscription plan set to 'free'
        const payload = {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            password,
            role,
            subscriptionPlan: 'free',
        };

        // এখানে আপনার Sign Up API কল করবেন
        console.log('Signup Payload:', payload);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
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
                    value={fullName}
                    onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName)
                            setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${
                        errors.fullName
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                        {errors.fullName}
                    </p>
                )}
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
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                            setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="example@mail.com"
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${
                        errors.email
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    }`}
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
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
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password)
                                setErrors({ ...errors, password: undefined });
                        }}
                        placeholder="Minimum 6 characters"
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${
                            errors.password
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Role Selection Input ('Student' or 'Tutor') */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {(['Student', 'Tutor'] as Role[]).map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => {
                                setRole(item);
                                if (errors.role)
                                    setErrors({ ...errors, role: undefined });
                            }}
                            className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition flex items-center justify-center gap-2 ${
                                role === item
                                    ? 'bg-green-50 border-green-600 text-green-700 ring-1 ring-green-600'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span>{item === 'Student' ? '🎓' : '👨‍🏫'}</span>
                            <span>{item}</span>
                        </button>
                    ))}
                </div>
                {errors.role && (
                    <p className="mt-1 text-xs text-red-600">{errors.role}</p>
                )}
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
