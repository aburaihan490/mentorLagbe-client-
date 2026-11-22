import React from 'react';
import { Button } from '@/components/ui/button';

const MyApplications = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">My Applications</h2>

                {/* Empty state or table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Tuition Title</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Tutor</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Monthly Fee</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Applied Date</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Status</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample application rows */}
                            {Array.from({ length: 3 }, (_, i) => ({
                                id: i + 1,
                                title: `Tuition Course ${i + 1}`,
                                tutor: `Tutor ${i + 1}`,
                                fee: `৳ ${5000 + i * 1000}`,
                                date: `2024-${String(i + 1).padStart(2, '0')}-15`,
                                status: i === 0 ? 'Pending' : i === 1 ? 'Accepted' : 'Rejected',
                            })).map((app) => (
                                <tr key={app.id} className="border-b border-slate-200">
                                    <td className="p-3 font-medium text-slate-900">{app.title}</td>
                                    <td className="p-3 text-slate-500">{app.tutor}</td>
                                    <td className="p-3 text-slate-500">{app.fee}</td>
                                    <td className="p-3 text-slate-500">{app.date}</td>
                                    <td className="p-3">
                                        <span className={app.status === 'Pending'
                                            ? 'bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded'
                                            : app.status === 'Accepted'
                                                ? 'bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded'
                                                : 'bg-red-100 text-red-700 text-xs px-2 py-1 rounded'}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {app.status === 'Pending' && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                className="text-red-600 hover:bg-red-100"
                                            >
                                                <span>Cancel</span>
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyApplications;