import type { LucideIcon } from 'lucide-react';
import { cn } from 'cn';

export interface StatCardItem {
    label: string;
    value: string | number;
    hint?: string;
    icon: LucideIcon;
    tone?: 'emerald' | 'blue' | 'violet' | 'amber';
}

const toneStyles: Record<NonNullable<StatCardItem['tone']>, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
};

/** Reusable summary cards shared by the tutor and admin overview pages. */
export function StatsCards({ items }: { items: StatCardItem[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-500">
                                    {item.label}
                                </p>
                                <p className="mt-2 truncate text-2xl font-extrabold tracking-tight text-slate-900">
                                    {item.value}
                                </p>
                                {item.hint && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        {item.hint}
                                    </p>
                                )}
                            </div>

                            <span
                                className={cn(
                                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                                    toneStyles[item.tone ?? 'emerald'],
                                )}
                            >
                                <Icon className="h-5 w-5" />
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export function PageHeader({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                )}
            </div>
            {children}
        </div>
    );
}

export function LoadingGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="h-28 animate-pulse rounded-2xl border border-slate-200/70 bg-white"
                />
            ))}
        </div>
    );
}

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <span className="text-xl">📭</span>
            </div>
            <p className="font-semibold text-slate-800">{title}</p>
            {description && (
                <p className="mt-1 max-w-md text-sm text-slate-500">
                    {description}
                </p>
            )}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}
