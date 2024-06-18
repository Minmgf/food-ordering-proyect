'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProducts from "@/components/menu/CartProducts";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resolve } from "styled-jsx/css";

export default function CartPage() {
    const {cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data: profileData} = useProfile();

    useEffect( () => {
        if (typeof window !== 'undefined'){
            if (window.location.href.includes('canceled=1')){
                toast.error('Payment canceled 😧 ');
            }
        }
    }, [])

    useEffect( () => {
        if(profileData?.city){
            const {phone, streetAddress, city, zipCode, country} = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                zipCode,
                country,
            };
            setAddress(addressFromProfile);
        }
    } , [profileData])

    let Subtotal = 0;
    for( const p of cartProducts){
        Subtotal += cartProductPrice(p);
    }

    function handleAddressChange(propName, value){
        setAddress( prevAddress => ({ ...prevAddress, [propName]: value}));
    }

    async function proceedToCheckout(ev){
        ev.preventDefault();
        //address and shopping cart products
        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    address,
                    cartProducts
                })
            }).then( async(response) => {
                if (response.ok){
                    resolve();
                    window.location = await response.json();
                }else {
                    reject();
                }
            });
            // redirect to stipe

        })

        toast.promise(promise, {
            loading : 'Preparing your order...',
            success : 'Redirecting to payment...',
            error : 'Something went wrong...Please try later',

        })
    }
    // console.log({cartProducts});

    if (cartProducts.length === 0){
        return(
            <section className="mt-8 text-center ">
                <SectionHeaders mainHeader="Cart" />
                <p className="">Your shopping cart is empty 😠 </p>
            </section>
        )
    }

    return(
        <section className="mx-auto my-8 ">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="gap-8 mt-8 md:grid md:grid-cols-2 ">
                <div>
                    {cartProducts?.length === 0 && (
                        <div className="">
                            No items in cart
                        </div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map(( product , index ) => (
                        <CartProducts
                            key={index}
                            product={product}
                            onRemove={removeCartProduct}
                            index={index}
                        />
                    ))}
                    <div className="flex items-center justify-end py-2 pr-16 text-right">
                        <div className="text-gray-500">
                            Subtotal: <br />
                            Delivery: <br />
                            Total:
                        </div>
                        <div className="pl-2 font-semibold text-right">
                            ${Subtotal} <br />
                            $5 <br />
                            ${Subtotal+5}
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                            />
                        <button type="submit"> Pay ${Subtotal+5}</button>
                    </form>

                </div>
            </div>
        </section>
    )
};