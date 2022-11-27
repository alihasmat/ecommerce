import { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";

import styles from "../styles/Success.module.css";
import { runFireWorks } from "../lib/utils";

function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireWorks();
  }, []);

  return (
    <div className={styles.success_wrapper}>
      <div className={styles.success}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Thank You for your order!</h2>
        <p className={styles.email_msg}>
          Check your email inbox for your receipt.
        </p>
        <p className={styles.description}>
          If you have any queries please email
          <a className={styles.email} href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className={styles.btn}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
