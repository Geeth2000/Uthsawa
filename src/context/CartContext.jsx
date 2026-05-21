import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

const formatVendorId = (vendorName) =>
  vendorName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = ({
    packageId,
    title,
    price,
    selectedAddOns = [],
    vendorName,
    vendorId,
  }) => {
    const itemId = `${packageId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    setCartItems((prev) => [
      ...prev,
      {
        itemId,
        packageId,
        title,
        price,
        selectedAddOns,
        vendorName,
        vendorId: vendorId || formatVendorId(vendorName),
      },
    ]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const groupedByVendor = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (!acc[item.vendorId]) {
        acc[item.vendorId] = {
          vendorId: item.vendorId,
          vendorName: item.vendorName,
          items: [],
        };
      }

      acc[item.vendorId].items.push(item);
      return acc;
    }, {});
  }, [cartItems]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems],
  );

  const addonsTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum +
          item.selectedAddOns.reduce(
            (addonSum, addon) => addonSum + addon.price,
            0,
          ),
        0,
      ),
    [cartItems],
  );

  const masterTotal = subtotal + addonsTotal;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    groupedByVendor,
    subtotal,
    addonsTotal,
    masterTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
