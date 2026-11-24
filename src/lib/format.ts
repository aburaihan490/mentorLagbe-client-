export const formatCurrency = (amount: number): string =>
    `৳${Number(amount || 0).toLocaleString('en-BD')}`;

export const formatDate = (value?: string): string => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

export const capitalize = (value?: string): string => {
    if (!value) return '—';
    return value.charAt(0).toUpperCase() + value.slice(1);
};
