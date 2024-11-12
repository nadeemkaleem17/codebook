import { useEffect, useState } from "react";
import { DashboardCard } from "./components/DashboardCard";
import { DashboardEmpty } from "./components/DashboardEmpty";
import { getUserOrders } from "../../services";
import { useTitle } from "../../hooks";
import { toast } from "react-toastify";

export const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function FetchOrders() {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        toast.error(error.message, {
          colseButton: true,
          position: "bottom-center",
        });
      }
    }
    FetchOrders();
  }, []);
  useTitle("Dashboard");

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8" />
      </section>
      <section>
        {orders.length &&
          orders.map((order) => <DashboardCard key={order.id} order={order} />)}
      </section>
      <section>{!orders.length && <DashboardEmpty />}</section>
    </main>
  );
};
