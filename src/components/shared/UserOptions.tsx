import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { User } from '@/types';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UserOptionsProps = {
    user: User
}

export function UserOptions({ user }: UserOptionsProps) {

    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            redirect: false
        });
        router.push('/auth/login');
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='ghost' className='hover:bg-transparent'>
                    <Image
                        src={user?.image || '/images/default-profile.svg'}
                        alt={user?.name || 'User'}
                        width={30}
                        height={30}
                        className='rounded-full cursor-pointer border-2 border-gray-200 dark: border-secondary w-auto'
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64'>
                <div className='flex gap-3 mb-5'>
                    <div>
                        <Image
                            src={user?.image || '/images/default-profile.svg'}
                            alt={user?.name || 'User'}
                            width={40}
                            height={15}
                            className='rounded-full w-auto'
                        />
                    </div>
                    <div className='space-y-0'>
                        <p className='font-semibold'>{user.name}</p>
                        <p className='text-sm'>{user.email}</p>
                    </div>
                </div>
                <p className='flex items-center gap-x-2 mt-2 text-slate-700 dark:text-white text-sm hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer' onClick={handleSignOut}>
                    <LogOutIcon className='h-5 w-5' strokeWidth={1} />
                    Sign out
                </p>
            </PopoverContent>
        </Popover>
    )
}
