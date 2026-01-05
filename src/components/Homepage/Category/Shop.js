function Shop() {
    return (
        <div className="px-6 py-10 font-sans">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Shop by category</h2>
                <p className="text-gray-600 mt-2">Men | Women</p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Men Collection */}
                <div className="relative group">
                    <img
                        src="https://dailypaperclothing.com/cdn/shop/files/16540003.jpg?v=1752072048&width=1920"
                        alt="Men Collection"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-6 left-6 text-white drop-shadow-md">
                        <p className="text-lg">Discover</p>
                        <h3 className="text-2xl font-bold">Men Collection</h3>
                        <button className="mt-3 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                            FOR HIM
                        </button>
                    </div>
                </div>

                {/* Women Collection */}
                <div className="relative group">
                    <img
                        src="https://dailypaperclothing.com/cdn/shop/files/A003216-R1-18-19A_2-1.jpg?v=1752072223&width=1920"
                        alt="Women Collection"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-6 left-6 text-white drop-shadow-md">
                        <p className="text-lg">Discover</p>
                        <h3 className="text-2xl font-bold">Women Collection</h3>
                        <button className="mt-3 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                            FOR HER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
