import React from 'react';
import { Button } from '@/components/ui/button';

const PaymentsPage = () => {
    return (
        <div className="space-y-6">
            {/* Payment Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 5-10L12 2zM2 17l5 10 10-5L12 17l-5-10-5 10z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">Total Paid</p>
                            <p className="text-2xl font-bold text-slate-900">৳ 45,000</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 5-10L12 2zM2 17l5 10 10-5L12 17l-5-10-5 10z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">Pending Payments</p>
                            <p className="text-2xl font-bold text-emerald-600">৳ 8,500</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 5-10L12 2zM2 17l5 10 10-5L12 17l-5-10-5 10z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">This Month</p>
                            <p className="text-2xl font-bold text-slate-900">৳ 5,000</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Payment History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Transaction ID</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Tuition</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Amount</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Date</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200">
                                <td className="p-3">TXN-20240115-001</td>
                                <td className="p-3 font-medium text-slate-900">Introduction to Python</td>
                                <td className="p-3 text-emerald-600">৳ 5,000</td>
                                <td className="p-3 text-slate-500">2024-01-15</td>
                                <td className="p-3">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Completed</span>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-200">
                                <td className="p-3">TXN-20240110-003</td>
                                <td className="p-3 font-medium text-slate-900">Advanced Mathematics</td>
                                <td className="p-3 text-emerald-600">৳ 8,000</td>
                                <td className="p-3 text-slate-500">2024-01-10</td>
                                <td className="p-3">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Completed</span>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-200">
                                <td className="p-3">TXN-20240105-007</td>
                                <td className="p-3 font-medium text-slate-900">English Speaking Course</td>
                                <td className="p-3 text-emerald-600">৳ 3,500</td>
                                <td className="p-3 text-slate-500">2024-01-05</td>
                                <td className="p-3">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Pending</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;