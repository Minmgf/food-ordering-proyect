export default function MenuItem(){
    return(
    <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all '>
        <div className="text-center ">
            <img src="/pizza.png" alt="alt" className="max-h-24 block mx-auto" />
        </div>
        <h4 className='font-semibold my-3 text-xl'>
            Pepperoni Pizza
        </h4>
        <p className='text-gray-500 text-sm'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laboriosam quia non, quo nobis perferendis earum itaque.
        </p>
        <button className='bg-primary px-8 mt-4 py-2 text-white rounded-full'>
            Add to cart $12
        </button>
    </div>
    )
}