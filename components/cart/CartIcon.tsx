import React, { useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { cartUiActions } from "../../store/cartUI-slice";
import { ICartUiRootState, ICartRootState } from "../../lib/types/cart";
import { useLanguage } from "../../hooks/useLanguage";

const Basket = () => {
  const dispatch = useDispatch();
  /*   const { locale } = useLanguage();
  const showCartBox = useSelector(
    (state: ICartUiRootState) => state.cartUi.cartBoxIsVisible
  );

  const nodeRef = useRef<HTMLDivElement>(null); */

  function onMouseHoverHandler(toggle: boolean) {
    dispatch(cartUiActions.toggleCartBox(toggle));
  }

  return (
    <div
      className="relative"
      onMouseOver={() => onMouseHoverHandler(true)}
      onMouseOut={() => onMouseHoverHandler(false)}
    >
      <Link href="/cart">
        <div className="relative flex items-center md:pl-6 md:border-l-2 md:border-l-palette-primary z-50">
          <AiOutlineShoppingCart style={{ fontSize: "1.6rem" }} />
          <span className="absolute -top-3 -right-[0.3rem] flex items-center justify-center w-5 h-5 rounded-full bg-palette-primary text-[0.75rem] leading-3 text-white shadow-lg">
            3 {/* {cartItemQuantity} */}
          </span>
        </div>
      </Link>
      {/*       <Transition
        nodeRef={nodeRef}
        in={showCartBox}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
       {(state) => {
          return (
            <div ref={nodeRef} className="z-[100]">
              <CartBox />
            </div>
          );
        }}
      </Transition> */}
    </div>
  );
};

export default Basket;
