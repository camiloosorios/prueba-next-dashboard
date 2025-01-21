import SignInButton from '@/components/shared/SignInButton'

export default function LoginPage() {

    return (
        <div className='min-h-screen mx-4 bg-gray-50 flex items-center justify-center'>
            <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-800'>Bienvenido a NextDashboard</h1>
                    <p className='text-gray-600 mt-2'>Inicia sesión para continuar</p>
                </div>

                <div className='mt-8 mx-auto w-fit'>
                    <SignInButton />
                </div>

                <div className='mt-6 text-center text-sm text-gray-500'>
                    Al iniciar sesión aceptas nuestros{' '}
                    <a href='/terms' className='text-blue-500 hover:underline'>
                        términos y condiciones
                    </a>.
                </div>
            </div>
        </div>
    )
}
