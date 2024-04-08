import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home(){
    return (
    <>
        <Header/>
        <Hero/>
        <HomeMenu/>
        <section className='text-center my-16'>
            <SectionHeaders subHeader="Our story" mainHeader="About us" />
            <div className="max-w-2xl mx-auto mt-8 text-gray-500
                            flex flex-col gap-4">
            <p className=''>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus porro nam eveniet doloremque consectetur! Sint magni dignissimos consequatur sapiente unde ipsam consectetur ab provident, error, mollitia aspernatur accusantium omnis?
            </p>
            <p className=''>
                Sint magni dignissimos consequatur sapiente unde ipsam consectetur ab provident, error, mollitia aspernatur accusantium omnis?
            </p>
            <p className=''>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quos debitis velit repellat accusantium odit sed, reprehenderit, dolor dolorum ipsum iusto, ullam exercitationem earum nesciunt nihil voluptatibus natus? Aliquam, iusto!
            </p>
            </div>
        </section>
        <section className=' mx-auto max-w-2xl text-center my-8'>
            <SectionHeaders subHeader="Don\'t hesitate" mainHeader="Contact us" />
            <div className="mt-8">
                <a href="tel:+573157541225" className='text-4xl underline text-gray-500 '>
                    +57 315 754 1225
                </a>
            </div>
        </section>
        <footer className='border-t p-4 text-center max-w-2xl mx-auto text-gray-500'>
            &copy; Minmgf
        </footer>
    </>
    );
};