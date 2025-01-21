'use client'
import { useAppStore } from '@/store/store';
import Image from 'next/image';
import { useState } from 'react';

export default function ThemeSelector() {

    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useAppStore(state => state.theme);
    const toggleTheme = useAppStore(state => state.toggleTheme);

    return (
        <div className='relative rounded-md border border-gray-200 dark:border-slate-700 p-1 hover:bg-gray-100 dark:hover:bg-slate-900 cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
            {theme === 'light' ? (
                <Image
                    src='/images/light.svg'
                    alt='Light Mode'
                    width={20}
                    height={20}
                />
            ) : (
                <Image
                    src='/images/dark.svg'
                    alt='Dark Mode'
                    width={20}
                    height={20}
                />
            )}
            {menuOpen && (
                <div className='z-10 absolute right-0 bg-white dark:bg-black shadow top-10 rounded-md text-sm w-32 font-semibold'>
                    <p className='px-3 py-1 hover:bg-gray-200 dark:hover:bg-secondary transition-colors duration-200 cursor-pointer rounded-md' onClick={() => toggleTheme('light')}>Light Theme</p>
                    <p className='px-3 py-1 hover:bg-gray-200 dark:hover:bg-secondary transition-colors duration-200 cursor-pointer rounded-md' onClick={() => toggleTheme('dark')}>Dark Theme</p>
                </div>
            )}
        </div>
    )
}
