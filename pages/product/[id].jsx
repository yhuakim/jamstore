import { BaseClient } from '@xata.io/client';
import { ChevronDownIcon, ChevronUpIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { useEffect, useState } from "react";
import axios from 'axios';

const Product = ({ product }) => {
    const { price, id, discount_id } = product[0]
    //const { discount_percent } = discount_id
    const costPrice = !discount_id ? price : price - (price * discount_id.discount_percent)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(null)
    const [amount, setAmount] = useState(costPrice)
    const { isLoading, data } = useVisitorData({ immediate: true })

    useEffect(() => {
        const productGallery = cloudinary.galleryWidget(
            {
                container: "#gallery",
                cloudName: "jilis",
                mediaAssets: [{ tag: `${product[0].tag_id.tagname}`, mediaType: "image" }]
            },
            []
        );
        productGallery.render();
    });

    const addToCartItems = async () => {
        const visitorID = data?.visitorId
        setLoading(true)
        try {
            const res = await axios.post('/api/addtocart', {
                quantity,
                amount,
                visitorID,
                product_id: id,
            })
            console.log(res);
            if (res && res.status === 200) {
                setLoading(false)
                setTimeout(() => {
                    setLoading(null)
                }, 10000)
            }
        } catch (error) {
            prompt(error.message)
        }
        //setTimeout(setLoading(null), 10000)
    }

    const handleChange = (e) => {
        const iconId = e.target.id
        if (iconId == 'up') {
            setQuantity(quantity + 1)
            setAmount(amount + costPrice)
        } else if (iconId == 'down') {
            if (quantity > 1) {
                setQuantity(quantity - 1)
                setAmount(amount - costPrice)
            } else if (quantity === 0) {
                setQuantity(1)
                setAmount(costPrice)
            }
        }
    }
    return (
        <div className='relative mx-auto'>
            <div id="toast-success" role="alert" className={`${loading === false && loading !== null ? 'flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow fixed z-50 right-10' : "hidden"}`}>
                <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">Item addded successfully.</div>
            </div>
            <div className="flex flex-col md:w-6/6 p-8 md:flex-row">
                <div className="md:w-4/6 md:h-96 px-5">
                    <div className='' id="gallery"></div>
                </div>
                <div className="price md:w-2/6">
                    <h3 className='text-3xl font-semibold'>{product[0].name}</h3>
                    <p className='text-lg'>
                        {product[0].desc} <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eaque totam aperiam temporibus asperiores, soluta eligendi architecto magni tempora. Perspiciatis a sequi id ut qui eligendi illo non unde vero!
                        Numquam quia maxime laudantium, provident libero fuga, voluptatem animi eveniet aliquid beatae mollitia odit laborum amet dolores. Id adipisci quidem nostrum alias dolorem ea, commodi rem repellendus repellat nihil molestias.
                    </p>
                    <p>
                        <b>₦{product[0].discount_id && product[0].discount_id.isActive ? (product[0].price - (product[0].price * product[0].discount_id.discount_percent)) : product[0].price}</b> <br />
                        <small><s className={`${!product[0].discount_id ? 'none' : 'text-gray-500 decoration-gray-500'}`}>₦{product[0].discount_id && product[0].discount_id.isActive ? product[0].price : ''}</s></small>
                    </p>
                    <div className="quantity py-2">
                        <ChevronUpIcon id='up' onClick={handleChange} className='w-6 h-6 hover:cursor-pointer' />
                        <span className='pl-2'>{quantity}</span>
                        <ChevronDownIcon id='down' onClick={handleChange} className='w-6 h-6 hover:cursor-pointer' />
                    </div>
                    <div className="flex items-center space-x-5">
                        <button onClick={addToCartItems} className='flex text-lg text-white px-3 py-2 bg-gray-800 hover:bg-black'>
                            Add To Cart <span className='text-xl bg-white text-black px-2 ml-2'>{amount}</span>
                        </button>
                        <div className={`${loading ? 'block' : 'hidden'}`}>
                            <div role="status">
                                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Product;

export async function getStaticPaths() {
    const xata = new BaseClient({
        branch: 'main',
        apiKey: process.env.API_KEY,
        databaseURL: 'https://yhuakims-rtl9qu.xata.sh/db/hackthon'
        //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
    });


    const page = await xata.db.products
        .select(["*", "category_id.*", "inventory_id.*", "discount_id.*", "tag_id.*"])
        .getPaginated({
            pagination: {
                size: 15,
            },
        });

    const products = JSON.parse(JSON.stringify(page.records))
    const paths =
        products &&
        products.map((prod) => ({
            params: { id: prod.id }
        }));

    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const xata = new BaseClient({
        branch: 'main',
        apiKey: process.env.API_KEY,
        databaseURL: 'https://yhuakims-rtl9qu.xata.sh/db/hackthon'
        //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
    });


    const page = await xata.db.products
        .select(["*", "category_id.*", "inventory_id.*", "discount_id.*", "tag_id.*"])
        .getPaginated({
            pagination: {
                size: 15,
            },
        });

    const products = JSON.parse(JSON.stringify(page.records))
    const product =
        products && products.filter((prod) => params.id === prod.id);

    return {
        props: {
            product
        }
    };
}
