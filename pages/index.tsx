import { client } from "../lib/client";

import { HeroBanner, Product, FooterBanner } from "../components";

import styles from "../styles/Home.module.css";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className={styles.product_heading}>
        <h1>Best Selling Product</h1>
        <p>Speakers of many variations</p>
      </div>
      <div className={styles.products_container}>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
