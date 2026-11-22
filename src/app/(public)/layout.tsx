import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
