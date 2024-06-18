'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const {loading, data:profile} = useProfile();

    useEffect(() => {
        fetchOrders();
    },[])

    function fetchOrders(){
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }

    return (
        <section className='max-w-2xl mx-auto mt-8 '>
            <UserTabs isAdmin={profile.admin}/>
            <div >
                {loadingOrders && (
                    <div className="">Loading Orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div className="flex flex-col items-center gap-6 p-4 mb-2 bg-gray-100 rounded-lg sm:flex-row ">
                        <div className="flex items-center gap-6 grow">

                            <div >
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-md text-white w-24 text-center'
                                    }>
                                    {order.paid ? 'Paid' : 'Not Paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="grow">{order.userEmail}</div >
                                    <div className="text-xs text-gray-500 ">{dbTimeForHuman(order.createdAt)}</div>
                                </div>
                                <div className="text-sm text-gray-500 ">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 text-right whitespace-nowrap">
                            <Link href={"/orders/"+order._id} className="button">
                                Show order
                            </Link>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}