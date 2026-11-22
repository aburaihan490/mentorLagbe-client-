import React from 'react';

const StudentDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Applied Tuitions Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3 9L9.3 16l-1.45 1.43L12 21l8-6-2-2L14 6l-5.7 1.2L12 2z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">Total Applied Tuitions</p>
                            <p className="text-2xl font-bold text-slate-900">12</p>
                        </div>
                    </div>
                </div>

                {/* Accepted Applications Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 5-10L12 2zM2 17l5 10 10-5L12 17l-5-10-5 10z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">Accepted Applications</p>
                            <p className="text-2xl font-bold text-slate-900">7</p>
                        </div>
                    </div>
                </div>

                {/* Pending Applications Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22c5.523 0 10-4.477 10-10s-4.477-10-10-10S2 6.523 2 12s4.477 10 10 10zm0-2c-6.637 0-12-5.363-12-12s5.363-12 12-12 12 5.363 12 12-5.363 12-12 12zm.988-9.09L14 8.067l-1.03-1.932.018-.06.953.729L15 11.05l.968.55.139-.046.884-.68L16 9.35l-.954-.777.064-1.886L15 5.15l-.98-.677-.953-.73.018-.06-.884.68-.968.55-.139.046L12 3.05l-1.15.777-1.016-.018L9.05 4.95l-.884.68-.018.06-.953-.73L8 6.95l.954.777-.064 1.886L9 10.95l.98.677.953.73.018.06.884-.68z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">Pending Applications</p>
                            <p className="text-2xl font-bold text-slate-900">4</p>
                        </div>
                    </div>
                </div>

                {/* Current Plan Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 5-10L12 2zM2 17l5 10 10-5L12 17l-5-10-5 10z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-slate-500 text-sm">Current Plan</p>
                            <p className="text-emerald-600 font-medium">Free</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Applications Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">My Applications</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Tuition Title</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Tutor</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Monthly Fee</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Applied Date</th>
                                <th className="p-3 text-left text-sm font-medium text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200">
                                <td className="p-3">Introduction to Python</td>
                                <td className="p-3">tutor@example.com</td>
                                <td className="p-3">৳ 5,000</td>
                                <td className="p-3">2024-01-15</td>
                                <td className="p-3">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Pending</span>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-200">
                                <td className="p-3">Advanced Mathematics</td>
                                <td className="p-3">tutor@example.com</td>
                                <td className="p-3">৳ 8,000</td>
                                <td className="p-3">2024-01-10</td>
                                <td className="p-3">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Accepted</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;