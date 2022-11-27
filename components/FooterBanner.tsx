import Link from "next/link";
import { urlFor } from "../lib/client";
import styles from "../styles/Home.module.css";

function FooterBanner({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) {
  return (
    <div className={styles.footerbanner_container}>
      <div className={styles.banner_desc}>
        <div className={styles.left}>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className={styles.right}>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <img
          src={urlFor(image)}
          className={styles.footerbanner_image}
          alt="headphone"
        />
      </div>
    </div>
  );
}

export default FooterBanner;
