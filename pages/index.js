import Layout from "@/src/components/layout";
import axios from "axios";
import {
  GET_PRODUCTS_ENDPOINT,
  HEADER_FOOTER_ENDPOINT,
} from "@/src/utils/constants/endpoints";
import Products from "@/src/components/products";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ headerFooter, products }) {
  

  return (
    <>
      <Layout headerFooter={headerFooter}>
        <Products  products={products} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data: headerFooterdata } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: productsData } = await axios.get(GET_PRODUCTS_ENDPOINT);

  const data = {
    headerFooter: headerFooterdata?.data,
    products: productsData?.products ?? {},
  };

  return {
    props: data || {},
    revalidate: 1,
  };
}
