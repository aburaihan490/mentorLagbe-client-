'use client';

import { X } from 'lucide-react';
import { cn } from 'cn';

export function Modal({
    open,
    onClose,
    title,
    description,
    children,
    wide = false,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    wide?: boolean;
}) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
            onClick={onClose}
        >
            <div
                className={cn(
                    'max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl',
                    wide ? 'max-w-3xl' : 'max-w-lg',
                )}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-1 text-sm text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
