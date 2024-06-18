'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../AppContext';
import ShoppingCart from '../icons/ShoppingCart';
import Bars2 from '../icons/Bars2';
import { useState } from 'react';

function AuthLinks({status, userName}){
    if(status === 'authenticated'){
        return(
                <>
                <Link href={'/profile'} className='whitespace-nowrap hover:font-bold'> Hello, {userName}</Link>
                <button
                onClick={() => signOut( {callbackUrl: '/'})}
                className='px-4 py-2 text-white rounded-full bg-primary'>
                    Logout
                </button>
                </>
        );
    }
    if(status === 'unauthenticated'){
        return(
            <>
            <Link href={'/login'} className=''>
                Login
            </Link>
            <Link href={'/register'} className='px-4 py-2 text-white rounded-full bg-primary'>
                Register
            </Link>
        </>
        );
    }
}

export default function Header(){
    const session = useSession();
    // console.log(session);
    const status = session.status;
    const userData = session?.data?.user ;
    let userName = userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext)
    const [mobileNavOpen, setMobileNavOpen] = useState(false);


    if(userName && userName.includes(' ')){
        userName = userName.split(' ')[0];
    }
    return(
        <header >

            {/* MOBILE NAVBAR */}

            <div className="flex items-center justify-between md:hidden">
                    <Link href={"/"} className='text-2xl font-semibold text-primary'>
                        ST PIZZA
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link href={'/cart'} className='relative'>
                        <ShoppingCart/>
                            { cartProducts?.length > 0 && (
                                <span className='absolute px-1 py-1 text-xs leading-3 text-white rounded-full -right-2 -top-3 bg-primary '>
                                    {cartProducts.length}
                                </span>
                            )}
                        </Link>
                        <button className="p-1" onClick={() => (setMobileNavOpen(prev => !prev))}>
                            <Bars2/>
                        </button>
                    </div>
            </div>
            {mobileNavOpen && (
            <div
                onClick={() => setMobileNavOpen(false)}
                className="flex flex-col gap-2 p-4 mt-2 text-center bg-gray-200 rounded-lg md:hidden ">
                <Link className="hover:font-bold"  href={'/'}>Home</Link>
                <Link className="hover:font-bold" href={'/menu'}>Menu</Link>
                <Link className="hover:font-bold" href={'/#about'}>About</Link>
                <Link className="hover:font-bold" href={'/#contact'}>Contact</Link>
                <AuthLinks status={status} userName={userName} className={"hover:font-bold"} />

            </div>
            )}

            {/* DESKTOP NAVBAR */}

            <div className="items-center justify-between hidden md:flex ">
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
                    <AuthLinks status={status} userName={userName}/>
                    <Link href={'/cart'} className='relative'>
                    <ShoppingCart/>
                        { cartProducts?.length > 0 && (
                            <span className='absolute px-1 py-1 text-xs leading-3 text-white rounded-full -right-2 -top-3 bg-primary '>
                                {cartProducts.length}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}