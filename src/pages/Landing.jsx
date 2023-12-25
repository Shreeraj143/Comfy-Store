import React from "react";
import { FeaturedProduct, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProduct />
    </>
  );
};

export default Landing;

export const loader = (QueryClient) => async () => {
  const response = await QueryClient.ensureQueryData(featuredProductsQuery);
  // console.log(response);
  const products = response.data.data;
  return { products };
};
