
/* grid grid - cols - 3 gap - 4 w - 96 ml - 4 pt - 4
 */
const Products = ({ products }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center">
            {
                products && products.map((prod, index) => (
                    <div className="relative w-52 bg-white rounded-md border border-gray-200 shadow-md m-3" key={index}>
                        <small>
                            <b className={`${!prod.discount_id ? 'none' : 'absolute top-2 right-2 text-xs text-red-300 bg-red-100 p-1'}`}>{prod.discount_id && prod.discount_id.isActive ? `${prod.discount_id.discount_percent * 100}%` : ''}</b>
                        </small>
                        <div className="w-52">
                            <a href={`/product/${prod.id}`} className="">
                                <img className='object-cover w-52 h-48' src={prod.imageUrl} alt="" />
                            </a>
                        </div>
                        <div className="card-info py-2 px-2">
                            <a href={`/product/${prod.id}`}>
                                <h3>{prod.name}</h3>
                                <p>
                                    <b>{prod.discount_id && prod.discount_id.isActive ? (prod.price - (prod.price * prod.discount_id.discount_percent)) : prod.price}</b> <br />
                                    <small><s className={`${!prod.discount_id ? 'none' : 'text-gray-500 decoration-gray-500'}`}>{prod.discount_id && prod.discount_id.isActive ? prod.price : ''}</s></small>
                                </p>
                            </a>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Products