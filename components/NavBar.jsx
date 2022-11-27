import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import styles from "../styles/Home.module.css";
import Cart from "./Cart";

import { useStateContext } from "../context/StateContext";

function NavBar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className={styles.navbar_container}>
      <p className={styles.logo}>
        <Link href="/">E-HEADPHONES</Link>
      </p>
      <button
        type="button"
        className={styles.cart_icon}
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className={styles.cartitem_qty}>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
}

export default NavBar;
