import { cn } from 'cn';

const statusStyles: Record<string, string> = {
    approved: 'bg-emerald-100 text-emerald-700',
    active: 'bg-emerald-100 text-emerald-700',
    accepted: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-emerald-100 text-emerald-700',
    pro: 'bg-violet-100 text-violet-700',
    pending: 'bg-amber-100 text-amber-700',
    rejected: 'bg-red-100 text-red-700',
    closed: 'bg-slate-200 text-slate-600',
    inactive: 'bg-slate-200 text-slate-600',
    free: 'bg-slate-100 text-slate-600',
};

export function StatusBadge({
    status,
    label,
}: {
    status?: string | null;
    label?: string;
}) {
    const key = (status ?? '').toLowerCase();

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
                statusStyles[key] ?? 'bg-slate-100 text-slate-600',
            )}
        >
            {label ?? (key ? key.replace(/_/g, ' ') : '—')}
        </span>
    );
}
