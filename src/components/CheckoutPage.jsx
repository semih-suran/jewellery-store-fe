import { useLocation } from "react-router-dom";
import PayPalCheckoutButton from "./PayPalCheckoutButton";

const CheckoutPage = () => {
  const location = useLocation();

  const { totalPrice } = location.state || { totalPrice: 0 };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
      <p className="text-center mb-4">Total Price: £{totalPrice}</p>
      <div className="w-full max-w-md mx-auto px-4">
        <PayPalCheckoutButton totalAmount={totalPrice} />
      </div>
    </div>
  );
};

export default CheckoutPage;
