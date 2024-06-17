'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProducts from "@/components/menu/CartProducts";
import { useParams } from "next/navigation";
import { useEffect, useContext, useState } from "react";

export default function OrderPage() {

    const {clearCart} = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if(window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }

        if(id){
            setLoadingOrder(true);
            fetch(`/api/orders?_id=${id}`).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                })
            })
        }
    },[])

    let subTotal = 0;
    if(order?.cartProducts){
        for(const product of order?.cartProducts){
            subTotal += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-8 ">
            <div className="text-center">
                <SectionHeaders mainHeader={"Your order"}/>
                <div className="mt-4 mb-8">
                    <p>Thanks for your order</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {loadingOrder && (
                <div className="">Loading Details</div>
            )}
            {order && (
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProducts product={product} />
                        ))}
                        <div className="py-2 text-right text-gray-500">
                            Subtotal:
                            <span className="inline-block w-8 font-bold text-black"> ${subTotal}</span>
                            <br/>
                            Delivery:
                            <span className="inline-block w-8 font-bold text-black"> $5</span>
                            <br/>
                            Total:
                            <span className="inline-block w-8 font-bold text-black"> ${subTotal + 5}</span>
                            <br/>
                        </div>
                    </div>
                    <div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <AddressInputs disabled={true} addressProps={...order} />
                        </div>
                    </div>
                    {/* {JSON.stringify(order)} */}
                </div>
            )}
        </section>
    );
}