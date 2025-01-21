'use client';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
    item: {
        label: string,
        icon: LucideIcon,
        href: string
    },
    key: string
}

export default function SidebarItem({ item: { label, icon: Icon, href } }: SidebarItemProps) {

    const pathname = usePathname();

    const activePath = pathname === href;

    return (
        <Link
            href={href}
            className={cn(`flex items-center gap-x-2 mt-2 text-slate-700 dark:text-white text-sm hover:bg-slate-300/20 p-2 rounded-lg`, activePath && 'bg-slate-400/20')}
        >
            <Icon className='h-5 w-5' strokeWidth={1} />
            {label}
        </Link>
    )
}
