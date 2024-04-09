import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home(){
    return (
    <>
        <Hero/>
        <HomeMenu/>
        <section className='my-16 text-center'>
            <SectionHeaders subHeader="Our story" mainHeader="About us" />
            <div className="flex flex-col max-w-2xl gap-4 mx-auto mt-8 text-gray-500">
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
        <section className='max-w-2xl mx-auto my-8 text-center '>
            <SectionHeaders subHeader="Don\'t hesitate" mainHeader="Contact us" />
            <div className="mt-8">
                <a href="tel:+573157541225" className='text-4xl text-gray-500 underline '>
                    +57 315 754 1225
                </a>
            </div>
        </section>

    </>
    );
};