export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, name, description, basePrice, sizes, extraIngredientPrices} = item;
    return(
        <div className='p-4 text-center transition-all bg-gray-200 rounded-lg hover:bg-white hover:shadow-md hover:shadow-black/25 '>
                <div className="text-center ">
                    <img src={image} alt="alt" className="block mx-auto max-h-24" />
                </div>
                <h4 className='my-3 text-xl font-semibold'>
                    {name}
                </h4>
                <p className='text-sm text-gray-500 line-clamp-3 '>
                    {description}
                </p>
                <button
                    type="button"
                    onClick={onAddToCart}
                    className='px-8 py-2 mt-4 text-white rounded-full bg-primary'>
                        {(sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
                            <span>Add to cart (from ${basePrice})</span>
                        ): (
                            <span>
                                Add to cart ${basePrice}
                            </span>
                        )}
                </button>
            </div>
    )
};