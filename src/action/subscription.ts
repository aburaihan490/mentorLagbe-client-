'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const checkOutAction = async () => {
    try {
        // Get authenticated user session
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            throw new Error('Unauthorized. Please login first.');
        }
        // Get JWT token
        const { token } = await auth.api.getToken({
            headers: await headers(),
        });

        if (!token) {
            throw new Error('JWT token not found');
        }

        const res = await fetch(
            `${process.env.BACKEND_BASE_URL}/checkout/create-checkout-session`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};
