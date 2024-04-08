export default function SectionHeaders({ subHeader, mainHeader }){
    return (
    <>
        <h3 className="uppercase text-gray-600 font-semibold leading-3">
            {subHeader}
        </h3>
        <h2 className="text-primary font-bold italic text-4xl">
            {mainHeader}
        </h2>
    </>
    )
}