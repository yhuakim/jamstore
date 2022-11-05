import { BaseClient } from '@xata.io/client';
import { ChevronDownIcon, ChevronUpIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { useEffect, useState } from "react";
import axios from 'axios';

const product = ({ product }) => {
    const { price, id, discount_id } = product[0]
    //const { discount_percent } = discount_id
    const costPrice = !discount_id ? price : price - (price * discount_id.discount_percent)
    const [quantity, setQuantity] = useState(1)
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
        const res = await axios.post('/api/addtocart', {
            quantity,
            amount,
            visitorID,
            product_id: id,
        })
        console.log(res);
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
        <>
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
                        <b>{product[0].discount_id && product[0].discount_id.isActive ? (product[0].price - (product[0].price * product[0].discount_id.discount_percent)) : product[0].price}</b> <br />
                        <small><s className={`${!product[0].discount_id ? 'none' : 'text-gray-500 decoration-gray-500'}`}>{product[0].discount_id && product[0].discount_id.isActive ? product[0].price : ''}</s></small>
                    </p>
                    <div className="quantity py-2">
                        <ChevronUpIcon id='up' onClick={handleChange} className='w-6 h-6 hover:cursor-pointer' />
                        <span className='pl-2'>{quantity}</span>
                        <ChevronDownIcon id='down' onClick={handleChange} className='w-6 h-6 hover:cursor-pointer' />
                    </div>
                    <button onClick={addToCartItems} className='flex text-lg text-white px-3 py-2 bg-gray-800 hover:bg-black'>
                        Add To Cart <span className='text-xl bg-white text-black px-2 ml-2'>{amount}</span>
                    </button>
                </div>
            </div>
        </>
    );
};
export default product;

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
