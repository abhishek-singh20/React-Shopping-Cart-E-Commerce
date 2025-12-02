import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { MapPin } from 'lucide-react'



const CheckOut = () => {

  const { cartTotal, clearCart } = useCart();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setIsConfirmed(true);
  };

  if (isConfirmed) return <OrderConfirmation deliveryDetails={deliveryDetails} />;

  return (
    <div className="container mx-auto px-4 md:py-8 pt-8">
      <h2 className="text-5xl font-extrabold text-white mb-10 tracking-tight">
        Finalize Order
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="lg:col-span-2 p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
          <h3 className="text-3xl font-bold text-orange-400 mb-6 flex items-center space-x-3 border-b border-gray-700 pb-4">
            <MapPin className="w-6 h-6 text-orange-500" />
            <span>Shipping Information</span>
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(deliveryDetails).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-semibold text-gray-300 capitalize mb-1">
                  {key === "zip" ? "Pin Code" : key}
                </label>
                <input
                  type={key === "zip" ? "number" : "text"}
                  id={key}
                  name={key}
                  value={deliveryDetails[key]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-5 py-3 border border-gray-700 rounded-xl shadow-inner text-white bg-gray-800 placeholder-gray-500"
                />
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-orange-600 text-white font-bold text-xl rounded-full shadow-lg shadow-orange-800/50 cursor-pointer hover:bg-orange-700 transition duration-300 flex items-center justify-center space-x-1 transform hover:ring-4 hover:ring-pink-600/50 uppercase tracking-wider"
              >
                <span>₹ Pay & Confirm Order (₹{cartTotal.toFixed(2)})</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CheckOut;
