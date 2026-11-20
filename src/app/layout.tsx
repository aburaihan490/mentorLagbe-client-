import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Shantell_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
