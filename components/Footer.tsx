import Link from "next/link";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import styles from "../styles/Home.module.css";

function Footer() {
  return (
    <div className={styles.footer_container}>
      <p>2022 E-HEADPHONES. All Rights Reserved.</p>
      <p className={styles.icons}>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
}

export default Footer;
