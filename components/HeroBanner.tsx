import Link from "next/link";
import { urlFor } from "../lib/client";

import styles from "../styles/Home.module.css";

function HeroBanner({ heroBanner }) {
  return (
    <div className={styles.herobanner_container}>
      <div>
        <p className={styles.beats_solo}>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className={styles.herobanner_image}
        />
      </div>
      <div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
        <div className={styles.desc}>
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
