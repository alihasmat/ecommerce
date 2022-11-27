import Link from "next/link";
import { urlFor } from "../lib/client";
import styles from "../styles/Home.module.css";

function Product({ product: { image, name, slug, price } }) {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={styles.product_card}>
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt="headphones"
            className={styles.product_image}
          />
          <p className={styles.product_name}>{name}</p>
          <p className={styles.product_price}>Rs {price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
