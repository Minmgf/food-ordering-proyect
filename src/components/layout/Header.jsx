'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header(){
    const session = useSession();
    // console.log(session);
    const status = session.status;
    const userData = session?.data?.user ;
    let userName = userData?.name || userData?.email;
    if(userName && userName.includes(' ')){
        userName = userName.split(' ')[0];
    }
    return(
        <header className='flex items-center justify-between '>
            <nav className='flex items-center gap-8 font-semibold text-gray-500'>
                <Link href={"/"} className='text-2xl font-semibold text-primary'>
                    ST PIZZA
                </Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/Menu'}>Menu</Link>
                <Link href={'/About'}>About</Link>
                <Link href={'/Contact'}>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 font-semibold text-gray-500'>
                {status === 'authenticated' && (
                    <>
                    <Link href={'/profile'} className='whitespace-nowrap'> Hello, {userName}</Link>
                    <button
                    onClick={() => signOut()}
                    className='px-4 py-2 text-white rounded-full bg-primary'>
                        Logout
                    </button>
                    </>
                )}
                {status !== 'authenticated' && (
                    <>
                        <Link href={'/login'} className=''>
                            Login
                        </Link>
                        <Link href={'/register'} className='px-4 py-2 text-white rounded-full bg-primary'>
                            Register
                        </Link>
                    </>
                )

                }


            </nav>
        </header>
    )
}