

const OrderSummary = ({ total }) => {
  const shipping = 20;
  const tax = 50;
  const finalTotal = total + shipping + tax;

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="bg-white shadow-lg rounded-xl p-6">

        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${total}.00</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shipping}.00</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold">${tax}.00</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${finalTotal}.00</span>
        </div>

        <button className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg text-lg hover:bg-orange-600 cursor-pointer">
          Proceed to Checkout
        </button>

      </div>
    </section>
  );
};

export default OrderSummary;
