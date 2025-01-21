import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard Application for managing your graphs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex w-full h-full'>
            <div className='hidden xl:block w-80 h-full xl:fixed'>
                <Sidebar />
            </div>
            <div className='w-full xl:ml-80'>
                <Header />
                <div className='p-6 bg-[#fafbfc] dark:bg-black'>
                    {children}
                </div>
            </div>
        </div>
    );
}
