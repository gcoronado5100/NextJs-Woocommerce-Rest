import Header from "../src/components/layouts/header";
import Footer from "../src/components/layouts/footer";
import axios from "axios";
import { HEADER_FOOTER_ENDPOINT } from "@/src/utils/constants/endpoints";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const { header, footer } = data;
  return (
    <>
      <Header header={header} />

      <main></main>

      <Footer footer={footer} />
    </>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(HEADER_FOOTER_ENDPOINT);

  return {
    props: data || {},
    revalidate: 1,
  };
}
