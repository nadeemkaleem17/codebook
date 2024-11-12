import { useEffect, useState } from "react";
import { ProductCard } from "../../../components/Elements/ProductCard";
import { getFeaturedList } from "../../../services";
import { toast } from "react-toastify";
export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const data = await getFeaturedList();
        // console.log("featured products");
        setProducts(data);
      } catch (error) {
        toast.error(error.message, {
          colseButton: true,
          position: "bottom-center",
        });
      }
    }
    fetchFeaturedProducts();
  }, []);
  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">
        Featured eBooks
      </h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Product Card */}
      </div>
    </section>
  );
};
