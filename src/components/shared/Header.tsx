'use client'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { User } from '@/types';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SidebarRoutes from './SidebarRoutes';
import ThemeSelector from './ThemeSelector';
import { UserOptions } from './UserOptions';

export default function Header() {

    const { data, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const user = data?.user as User;

    useEffect(() => {
        if (status === 'loading') {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

    }, [status]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-[#fafbfc] dark:bg-black flex justify-between xl:justify-end px-3 py-2 gap-2'>
            <div className='block xl:hidden'>
                <Sheet>
                    <SheetTrigger className='flex items-center'>
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <SheetTitle></SheetTitle>
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>
            <div className='flex gap-x-2 items-center'>
                <ThemeSelector />
                {user && (
                    <UserOptions
                        user={user}
                    />
                )}
            </div>
        </div>
    )
}
