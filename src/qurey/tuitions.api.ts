'use server';

import { ITuition } from '@/types/tuition';

const URL = process.env.BACKEND_BASE_URL;

const getTuitions = async (): Promise<ITuition[]> => {
    try {
        const res = await fetch(`${URL}/tuition/all-tuitions`);

        if (!res.ok) {
            throw new Error('Failed to fetch tuitions');
        }

        const result = await res.json();

        return result.data || [];
    } catch (error) {
        console.error('Get Tuitions Error:', error);
        return [];
    }
};

export default getTuitions;
