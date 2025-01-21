'use client'
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/store';
import { LogOutIcon, PanelsTopLeft, SettingsIcon, Store } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SidebarItem from './SidebarItem';


const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        icon: Store,
        label: 'Products',
        href: '/products'
    },
];

export default function SidebarRoutes() {

    const toogleTheme = useAppStore(state => state.toggleTheme);
    const theme = useAppStore(state => state.theme);
    const router = useRouter();

    const handleChangeTheme = () => {
        toogleTheme(theme === 'light' ? 'dark' : 'light');
    }

    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push('/auth/login');
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className='flex py-10 items-center justify-center gap-2 border-b border-gray-200 dark:border-secondary'>
                    <Image
                        src='/images/logo.svg'
                        alt='Logo App'
                        width={50}
                        height={50}
                    />
                    <span className='text-2xl'>NextDashboard</span>
                </div>
                <div className='p-2 md:p-6'>
                    <p className='font-bold'>GENERAL</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
                <Separator />
                <div className='p-2 md:p-6'>
                    <p className='font-bold'>SUPPORT</p>
                    <p className='flex items-center gap-x-2 mt-2 text-slate-700 dark:text-white text-sm hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer' onClick={handleChangeTheme}>
                        <SettingsIcon className='h-5 w-5' strokeWidth={1} />
                        Toogle Theme
                    </p>
                    <p className='flex items-center gap-x-2 mt-2 text-slate-700 dark:text-white text-sm hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer' onClick={handleSignOut}>
                        <LogOutIcon className='h-5 w-5' strokeWidth={1} />
                        Sign out
                    </p>
                </div>
            </div>
            <div>
                <Separator />
                <footer className='mt-3 p-3 text-center'>
                    {new Date().getFullYear()}. All rights reserverd ©
                </footer>
            </div>
        </div>
    )
}
