import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Shantell_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const jakartaSans = Plus_Jakarta_Sans({
    variable: '--font-sans',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
});

// শুধুমাত্র হ্যান্ডরাইটিং/হাইলাইট টেক্সটের জন্য (ঐচ্ছিক)
const shantellSans = Shantell_Sans({
    variable: '--font-handwriting',
    subsets: ['latin'],
    weight: ['400', '600'],
});

export const metadata: Metadata = {
    title: 'MentorLagbe - Smart Tuition & Mentorship Platform',
    description:
        'MentorLagbe connects students with verified tutors for personalized learning, both online and offline.',
};
export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${jakartaSans.variable} ${shantellSans.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                {children}
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            borderRadius: '10px',
                            fontSize: '14px',
                            padding: '12px 16px',
                        },
                        success: {
                            style: {
                                background: '#DCFCE7',
                                color: '#166534',
                                border: '1px solid #86EFAC',
                            },
                            iconTheme: {
                                primary: '#16A34A',
                                secondary: '#FFFFFF',
                            },
                        },
                        error: {
                            style: {
                                background: '#FEE2E2',
                                color: '#991B1B',
                                border: '1px solid #FCA5A5',
                            },
                            iconTheme: {
                                primary: '#DC2626',
                                secondary: '#FFFFFF',
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
