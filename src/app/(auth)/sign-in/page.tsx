import SigninForm from './_components/SigninForm';

const SignInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        আপনার অ্যাকাউন্টে লগইন করতে তথ্য দিন
                    </p>
                </div>

                <SigninForm />
            </div>
        </div>
    );
};

export default SignInPage;
