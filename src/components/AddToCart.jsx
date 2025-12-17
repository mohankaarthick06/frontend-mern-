
import { useState } from "react";

const AddToCart = ({ onUpdateTotal }) => {
  const price = 1299; 
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    const newQty = qty + 1;
    setQty(newQty);
    onUpdateTotal(newQty * price);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      onUpdateTotal(newQty * price);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6">

        
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          className="w-40 h-40 object-cover rounded-lg"
        />

      
        <div className="flex-1">
          <h3 className="text-xl font-semibold">UltraBook Pro X15</h3>

          <p className="text-gray-600 text-sm mt-1">
            Sleek, lightweight, powerful laptop for all professionals.
          </p>

          <div className="flex items-center mt-4 gap-6">
            <p className="text-lg font-bold">${price}.00</p>

            <div className="flex items-center gap-2">
              <span
                onClick={decreaseQty}
                className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
              >
                -
              </span>

              <span className="px-3 py-1 border rounded">{qty}</span>

              <span
                onClick={increaseQty}
                className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
              >
                +
              </span>
            </div>
          </div>

          <p className="mt-4 font-semibold">
            Subtotal: ${qty * price}.00
          </p>
        </div>

      </div>
    </section>
  );
};

export default AddToCart;
