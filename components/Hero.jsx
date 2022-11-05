

const Hero = () => {
    return (
        <>
            <div
                className="hero relative w-100 h-screen bg-cover lg:bg-contain bg-center flex flex-col justify-center 
            bg-[url('https://res.cloudinary.com/jilis/image/upload/v1667355248/myshop/hero-bg.jpg')]">
                <div className="flex flex-col justify-center space-y-8 items-center">
                    <h1 className="text-2xl text-gray-800 md:text-3xl md:tracking-widest lg:text-4xl uppercase tracking-wider font-bold w-100 bg-white/50 p-10 lg:px-40 py-10">Your No.1 Fashion Store</h1>
                    <a href="#products" className="text-lg md:text-2xl border-2 border-black text-white font-medium hover:shadow-lg hover:bg-black hover:text-white px-5 md:px-10 py-5">Shop Now</a>
                </div>
            </div>
        </>
    )
}

export default Hero