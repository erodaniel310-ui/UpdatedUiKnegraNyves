import React from "react";

const cardData = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: `Outfit ${i + 1}`,
  price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
  image1: "https://dailypaperclothing.com/cdn/shop/files/DIASHDT-SHIRT_MARTIMEBLUE_BACK.jpg?v=1733227019&width=500",
  image2: "https://dailypaperclothing.com/cdn/shop/files/DIASHDT-SHIRT_MARTIMEBLUE_FRONT.jpg?v=1733227017",
}));

function Cards() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="relative bg-white border border-gray-200 shadow-md group overflow-hidden"
          >
            

            {/* Image container */}
            <div className="relative w-full h-64 flex justify-center items-center">
              <img
                src={card.image1}
                alt="Default"
                className="w-full h-full object-cover group-hover:hidden"
              />
              <img
                src={card.image2}
                alt="Hover"
                className="w-full h-full object-cover hidden group-hover:block absolute top-0 left-0"
              />
            </div>

            {/* Sizes on hover */}
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded">
                XS&nbsp;&nbsp;S&nbsp;&nbsp;M&nbsp;&nbsp;L&nbsp;&nbsp;XL
              </div>
            </div>

            {/* Name and Price */}
            <div className="flex justify-between px-4 py-3 text-sm text-gray-700">
              <span>{card.name}</span>
              <span className="font-semibold">{card.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
