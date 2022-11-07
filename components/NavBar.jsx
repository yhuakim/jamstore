import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const NavBar = () => {
    const [cartItems, setCartItems] = useState([])
    const { isLoading, data } = useVisitorData({ immediate: true })
    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(!toggle)
    }

    const totalQuantity = cartItems.map((item) => item.quantity)
        .reduce((a, b) => a + b, 0)

    useEffect(() => {
        const getCartItems = async () => {
            const visitorID = data?.visitorId
            const res = await axios.post('/api/getcart', { visitorID })
            setCartItems(res.data.data)
            console.log(res.data, visitorID);
        }
        getCartItems()
    }, [isLoading, data])
    return (
        <>

            <nav className="bg-slate-100 px-2 sm:px-4 py-2.5 sticky w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Link href="/" className="flex items-center text-black">
                        <ShoppingCartIcon className='w-9 h-9' />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">JAMzStore</span>
                    </Link>
                    <div className="flex md:order-2">
                        <Link href='/cart' className="text-black hover:text-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium relative rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                            <ShoppingBagIcon className='w-6 h-6' />
                            <small className='bg-black rounded-full text-white text-[8px] font-semibold absolute px-1 top-0' >{totalQuantity}</small>
                        </Link>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false"
                            onClick={toggleMenu}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`${toggle ? "justify-between items-center w-full md:flex md:w-auto md:order-1" : "hidden justify-between items-center w-full md:flex md:w-auto md:order-1"}`} id="navbar-sticky">
                        <ul className="flex flex-col p-4 mt-4 bg-slate-100 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-slate-100">
                            <li>
                                <Link href="/" className="block py-2 pr-4 pl-3 text-white bg-black rounded md:bg-transparent md:text-black md:p-0" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="#products" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:p-0">Products</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:p-0">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default NavBar