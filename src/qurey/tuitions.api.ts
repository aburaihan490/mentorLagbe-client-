import 'server-only';
import { ITuitionResponse } from '@/types/tuition';

const URL = process.env.BACKEND_BASE_URL;

interface TuitionQuery {
    search?: string | string[];
    subject?: string | string[];
    class?: string | string[];
    mode?: string | string[];
    page?: number;
}

const getTuitions = async (query: TuitionQuery): Promise<ITuitionResponse> => {
    try {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.set(key, String(value));
            }
        });
        const res = await fetch(
            `${URL}/tuition/all-tuitions?${params.toString()}`,
        );

        if (!res.ok) {
            throw new Error('Failed to fetch tuitions');
        }

        return await res.json();
    } catch (error) {
        console.error('Get Tuitions Error:', error);
        throw error;
    }
};

export default getTuitions;
