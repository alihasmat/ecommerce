import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import styles from "../styles/ProductDetail.module.css";
import Link from "next/link";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

function Cart() {
  const {
    setShowCart,
    totalQuantities,
    cartItems,
    totalPrice,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className={styles.cart_wrapper}>
      <div className={styles.cart_container}>
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className={styles.cart_heading}
        >
          <AiOutlineLeft />
          <span className={styles.heading}>Your cart</span>
          <span className={styles.cart_num_items}>
            ({totalQuantities} items)
          </span>
        </button>

        {cartItems < 1 && (
          <div className={styles.empty_cart}>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty!</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className={styles.btn}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className={styles.product_container}>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className={styles.product} key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className={styles.product_cart_image}
                />
                <div className={styles.item_desc}>
                  <div className={`${styles.flex} ${styles.top}`}>
                    <h4>{item.name}</h4>
                    <h5>Rs {item.price}</h5>
                  </div>
                  <div className={`${styles.flex} ${styles.bottom}`}>
                    <div>
                      <p className={styles.quantity_desc}>
                        <span
                          className={styles.minus}
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className={styles.num}>{item.quantity}</span>
                        <span
                          className={styles.plus}
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className={styles.remove_item}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className={styles.cart_bottom}>
            <div className={styles.total}>
              <h3>Subtotal:</h3>
              <h3>Rs {totalPrice}</h3>
            </div>
            <div className={styles.btn_container}>
              <button
                type="button"
                onClick={handleCheckout}
                className={styles.btn}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
