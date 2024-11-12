import { createContext, useContext, useReducer } from "react";
import { CartReducer } from "../reducer";

const initialState = {
  cartList: [],
  total: 0,
};

const CartContext = createContext(initialState);
// -- Cart Provider --
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  function addToCart(product) {
    const updatedList = state.cartList.concat(product);
    const updatedTotal = state.total + product.price;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cartList: updatedList,
        total: updatedTotal,
      },
    });
  }
  function removeFromCart(product) {
    const updatedList = state.cartList.filter((item) => item.id !== product.id);
    const updatedTotal = state.total - product.price;

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  }
  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        products: [],
        total: 0,
      },
    });
  }
  const values = {
    cartList: state.cartList,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

// Global context of Cart
const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export { useCart, CartProvider };
