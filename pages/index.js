import Header from "../src/components/layouts/header";
import Footer from "../src/components/layouts/footer";
import axios from "axios";
import {
  GET_PRODUCTS_ENDPOINT,
  HEADER_FOOTER_ENDPOINT,
} from "@/src/utils/constants/endpoints";
import Products from "@/src/components/products";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ headerFooter, products }) {
  const { header, footer } = headerFooter;

  return (
    <>
      <Header header={header} />

      <main className='container mx-auto py-4'>
        <Products products={products} />
      </main>

      <Footer footer={footer} />
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
