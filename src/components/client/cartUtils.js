// Cart utility functions

export const addToCart = (product) => {
  try {
    const existingCart = localStorage.getItem("cart");
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if cart is empty or if this product is from the same store
    if (cartItems.length === 0) {
      // First item in cart - add it
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: product.store,
        storeId: product.storeId,
        quantity: 1
      });
    } else {
      // Check if this product is from the same store as existing items
      const firstItem = cartItems[0];
      if (firstItem.storeId === product.storeId) {
        // Same store - check if product already exists
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
          // Update quantity if product already exists
          cartItems[existingItemIndex].quantity += 1;
        } else {
          // Add new product to cart
          cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            store: product.store,
            storeId: product.storeId,
            quantity: 1
          });
        }
      } else {
        // Different store - show error
        alert(`You can only purchase products from one store at a time. Your cart contains items from ${firstItem.store}. Please complete your current order or clear your cart first.`);
        return false;
      }
    }
    
    localStorage.setItem("cart", JSON.stringify(cartItems));
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const getCartItems = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart items:", error);
    return [];
  }
};

export const getCartItemCount = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const getCartStoreInfo = () => {
  const cartItems = getCartItems();
  if (cartItems.length > 0) {
    return {
      storeName: cartItems[0].store,
      storeId: cartItems[0].storeId
    };
  }
  return null;
};

export const updateCartItemQuantity = (itemId, newQuantity) => {
  try {
    const cartItems = getCartItems();
    const updatedItems = newQuantity <= 0 
      ? cartItems.filter(item => item.id !== itemId)
      : cartItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
    
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return true;
  } catch (error) {
    console.error("Error updating cart item:", error);
    return false;
  }
};

export const removeFromCart = (itemId) => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return false;
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem("cart");
    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    return false;
  }
}; 