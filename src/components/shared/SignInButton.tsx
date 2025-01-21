'use client'
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignInButton() {

    return (
        <button onClick={() => signIn('google')} className='border border-gray-200 shadow-lg p-3 rounded-xl'>
            <Image
                src='/images/google.svg'
                alt='Google Icon'
                width={20}
                height={20}
                className='inline-block w-auto'
            />
            <span className='mx-3 text-gray-800 font-semibold'>Iniciar sesión con Google</span>
        </button>
    )
}
