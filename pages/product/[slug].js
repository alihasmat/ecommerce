import { useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/ProductDetail.module.css";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { Product } from "../../components";

function ProductDetails({ product, products }) {
  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0);

  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className={styles.product_detail_container}>
        <div>
          <div className={styles.image_container}>
            <img
              src={urlFor(image && image[index])}
              className={styles.product_detail_image}
            />
          </div>
          <div className={styles.small_images_container}>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index
                    ? `${styles.small_image} ${styles.selected_image}`
                    : `${styles.small_image}`
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className={styles.product_detail_desc}>
          <h1>{name}</h1>
          <div className={styles.reviews}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className={styles.price}>Rs {price}</p>
          <div className={styles.quantity}>
            <h3>Quantity</h3>
            <p className={styles.quantity_desc}>
              <span className={styles.minus} onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className={styles.num}>{qty}</span>
              <span className={styles.plus} onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.add_to_cart}
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={styles.buy_now}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className={styles.maylike_product_wrapper}>
        <h2>You may also like</h2>
        <div className={`${styles.marquee} ${styles.track}`}>
          <div className={styles.maylike_product_container}>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == product] {
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type=="product" && slug.current=='${slug}'][0]`;
  const productQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
