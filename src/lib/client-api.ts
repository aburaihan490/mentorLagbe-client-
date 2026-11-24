interface ApiResult<T> {
    success: boolean;
    message?: string;
    data: T;
}

/** Small fetch helper for the dashboard client components. */
export async function apiFetch<T>(
    url: string,
    init?: RequestInit,
): Promise<ApiResult<T>> {
    const response = await fetch(url, { ...init, cache: 'no-store' });
    const result = (await response.json()) as ApiResult<T>;

    if (!response.ok) {
        throw new Error(result.message ?? 'Something went wrong.');
    }

    return result;
}
