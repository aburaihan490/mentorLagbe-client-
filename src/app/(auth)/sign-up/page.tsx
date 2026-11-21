import SignupForm from './_components/SignupForm';

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন
                    </p>
                </div>

                <SignupForm />
            </div>
        </div>
    );
};

export default SignUpPage;
