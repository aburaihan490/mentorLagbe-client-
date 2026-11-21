'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // এখানে আপনার লগইন API কল বা অথেনটিকেশন লজিক বসাবেন
        console.log('Login Data:', { email, password });

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-xs text-green-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
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
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition duration-200 disabled:opacity-50"
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
                অ্যাকাউন্ট নেই?{' '}
                <Link
                    href="/sign-up"
                    className="text-green-600 font-medium hover:underline"
                >
                    Sign Up করুন
                </Link>
            </p>
        </form>
    );
};

export default SigninForm;
