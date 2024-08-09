export const formatPrice = (price) => {
  if (!price || typeof price !== "string") {
    return 0;
  }
  const cleanPrice = price.replace("£", "");
  return parseFloat(cleanPrice) || 0;
};

export const calculateTotalPrice = (items) => {
  return items
    .reduce((total, item) => total + formatPrice(item.price) * item.quantity, 0)
    .toFixed(2);
};
