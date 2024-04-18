'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../AppContext';
import ShoppingCart from '../icons/ShoppingCart';

export default function Header(){
    const session = useSession();
    // console.log(session);
    const status = session.status;
    const userData = session?.data?.user ;
    let userName = userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext)


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
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 font-semibold text-gray-500'>
                {status === 'authenticated' && (
                    <>
                    <Link href={'/profile'} className='whitespace-nowrap'> Hello, {userName}</Link>
                    <button
                    onClick={() => signOut( {callbackUrl: '/'})}
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
                )}
                <Link href={'/cart'} className='relative'>
                    <ShoppingCart/>
                    <span className='absolute px-1 py-1 text-xs leading-3 text-white rounded-full -right-2 -top-3 bg-primary '>
                        {cartProducts.length}
                    </span>
                </Link>


            </nav>
        </header>
    )
}