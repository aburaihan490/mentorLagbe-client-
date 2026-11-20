export function FeaturedTuitionsSkeleton() {
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-8 text-3xl font-bold">Featured Tuitions</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse overflow-hidden rounded-2xl border bg-white"
                        >
                            <div className="h-48 bg-slate-200" />

                            <div className="space-y-4 p-5">
                                <div className="h-4 w-24 rounded bg-slate-200" />
                                <div className="h-6 w-full rounded bg-slate-200" />
                                <div className="h-4 w-32 rounded bg-slate-200" />
                                <div className="h-12 rounded-xl bg-slate-200" />
                                <div className="h-10 rounded-lg bg-slate-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
