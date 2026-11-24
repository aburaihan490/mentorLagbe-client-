'use client';

import { ITuition } from '@/types/tuition';
import ApplyAction from './ApplyAction';
import Image from 'next/image';

interface TuitionDetailsProps {
    tuition: ITuition;
    userRole?: 'student' | 'tutor' | 'admin' | null;
    server_url: string | undefined;
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 font-semibold text-gray-800">{value}</p>
        </div>
    );
}

export default function TuitionDetails({
    tuition,
    server_url,
}: TuitionDetailsProps) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-6xl px-4">
                {/* Banner */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="relative h-72 md:h-96">
                        <Image
                            width={500}
                            height={500}
                            src={tuition.bannerImage}
                            alt={tuition.title}
                            loading="eager"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute bottom-8 left-8 text-white">
                            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm">
                                {tuition.subject}
                            </span>

                            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
                                {tuition.title}
                            </h1>

                            <p className="mt-2 text-gray-200">
                                📍 {tuition.location}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-3">
                        <div className="rounded-xl bg-blue-50 p-5">
                            <p className="text-sm text-gray-500">Monthly Fee</p>
                            <h2 className="mt-2 text-2xl font-bold text-blue-700">
                                ৳{tuition.monthlyFee.toLocaleString('en-BD')}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-green-50 p-5">
                            <p className="text-sm text-gray-500">Class Level</p>
                            <h2 className="mt-2 text-xl font-bold text-green-700">
                                {tuition.classLevel}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-purple-50 p-5">
                            <p className="text-sm text-gray-500">
                                Days Per Week
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-purple-700">
                                {tuition.daysPerWeek} Days
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    {/* Tuition Information */}
                    <div className="space-y-8 lg:col-span-2">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Tuition Overview
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                {tuition.description}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Tuition Information
                            </h2>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                <InfoItem
                                    label="Subject"
                                    value={tuition.subject}
                                />

                                <InfoItem
                                    label="Class Level"
                                    value={tuition.classLevel}
                                />

                                <InfoItem
                                    label="Teaching Mode"
                                    value={tuition.mode}
                                />

                                <InfoItem
                                    label="Location"
                                    value={tuition.location}
                                />

                                <InfoItem
                                    label="Monthly Fee"
                                    value={`৳${tuition.monthlyFee}`}
                                />

                                <InfoItem
                                    label="Days Per Week"
                                    value={`${tuition.daysPerWeek} Days`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tutor Information */}
                    <div>
                        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">
                                Tutor Information
                            </h2>

                            <div className="mt-6 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                                    {tuition.tutorName.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        {tuition.tutorName}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Tuition Provider
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4 border-t pt-5">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>
                                    <p className="mt-1 break-all font-medium text-gray-800">
                                        {tuition.tutorEmail}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Approval Status
                                    </p>
                                    <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        {tuition.approvalStatus}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tuition Status
                                    </p>
                                    <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        {tuition.isActive
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Apply Button */}
                            <ApplyAction
                                tuition={tuition}
                                server_url={server_url}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
