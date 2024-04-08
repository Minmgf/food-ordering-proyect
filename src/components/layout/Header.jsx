import Link from 'next/link';

export default function Header(){
    return(
        <header className='flex items-center justify-between '>
            <Link href="" className='text-primary font-semibold text-2xl'>
                Logo
            </Link>
            <nav className='flex gap-8 items-center text-gray-500 font-semibold'>
                <Link href={''}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contact</Link>
                <Link href={''} className='bg-primary px-4 py-2 rounded-full text-white'>Login</Link>
            </nav>
        </header>
    )
}