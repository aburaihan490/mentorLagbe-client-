export default function Loading() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

            <h2 className="mt-5 text-xl font-semibold text-gray-800">
                Loading...
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                Please wait while we load your content.
            </p>
        </div>
    );
}
