import type { Document } from 'mongodb';

/** Normalizes Mongo / Stripe date values into an ISO string. */
export function toISOString(value: unknown): string {
    if (value instanceof Date) return value.toISOString();

    if (typeof value === 'number' && Number.isFinite(value)) {
        const milliseconds = value < 1e12 ? value * 1000 : value;
        return new Date(milliseconds).toISOString();
    }

    if (typeof value === 'string' && value) {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }

    if (value && typeof value === 'object' && 'toDate' in value) {
        const dateValue = (value as { toDate: () => Date }).toDate();
        if (dateValue instanceof Date) return dateValue.toISOString();
    }

    return '';
}

export function readAmount(value: unknown): number {
    const amount = Number(value ?? 0);
    return Number.isFinite(amount) ? amount : 0;
}

/** Converts a Mongo document into a JSON-safe plain object. */
export function serializeDocument(doc: Document): Record<string, unknown> {
    const result: Record<string, unknown> = { ...doc };
    result._id = String(doc._id);

    for (const key of ['createdAt', 'updatedAt', 'paymentDate', 'date']) {
        if (key in result) result[key] = toISOString(result[key]);
    }

    return result;
}
