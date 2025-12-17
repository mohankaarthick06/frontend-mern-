const HeroCard = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold mb-8">Today's Exclusive Pick</h2>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden md:flex">

        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            className="w-full h-80 object-cover md:h-full"
          />
        </div>

        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <span className="text-orange-500 font-semibold tracking-wider">
            FEATURED PRODUCT
          </span>

          <h3 className="text-3xl font-bold mt-2">MAC BOOK PRO AIR </h3>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Experience blazing-fast performance with the new MAC Book Pro.
            Sleek, lightweight, and powerful — perfect for creators, gamers, and professionals.
          </p>

          <div className="mt-6">
            <p className="text-2xl font-bold">$1299.00</p>
            <p className="text-sm text-gray-400 line-through">$1599.00</p>
          </div>

          <button className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg text-lg hover:bg-orange-600 cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCard;
