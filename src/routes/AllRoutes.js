import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ProductDetail,
  ProductsList,
  Login,
  Register,
  CartPage,
  OrderPage,
  DashboardPage,
  PageNotFound,
} from "../pages";
import { ProtectedRoutes } from "./protectedRoutes";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="cart"
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route path="order-summary" element={<OrderPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<PageNotFound />} />
        {/* json-server data/db.json -m ./node_modules/json-server-auth */}
      </Routes>
    </>
  );
};
