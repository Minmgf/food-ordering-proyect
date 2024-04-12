'use client'
import EditableImage from "@/components/layout/EditableImage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserTabs from "@/components/layout/UserTabs";
import { set } from "mongoose";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const session = useSession();
    console.log(session)
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    // const [adminInfoLoading, setAdminInfoLoading] = useState(false);
    const {status} = session;


    useEffect( () => {
        // setAdminInfoLoading(true);
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            // setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then( data => {
                    console.log(data)
                    setUserName(data.name);
                    setImage(data.image);
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setZipCode(data.zipCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                })
            })
        }
    }, [session, status])

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();

        const savingPromise = new Promise ( async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: userName,
                    image,
                    streetAddress,
                    zipCode,
                    city,
                    country,
                    phone,
                }),
            });
            if(response.ok)
                resolve()
            else
                reject();
        });

        toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error'
        })

    }



    if( status === 'loading'){
        return 'Loading...';
    }
    if(status === 'unauthenticated'){
        redirect('/login');
    }


    return(
        <section className="my-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="max-w-md mx-auto ">
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[180px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label for="">First and last name</label>
                        <input type="text" name="name" placeholder="First and last name"
                        value={userName}  onChange={ev => setUserName(ev.target.value)}/>
                        <label for="">Email</label>
                        <input type="email"
                        placeholder="Email address"
                        value={session.data.user.email} disabled={true} id="" />
                        <label for="">Phone number</label>
                        <input
                            type="tel" placeholder="Phone number"
                            value={phone} onChange={ev => setPhone(ev.target.value)}  />
                        <label for="">Street Adress</label>
                        <input
                            type="text" placeholder="Street address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                        <div className="flex gap-x-4">
                            <div className="">
                                <label for="">City</label>
                                <input
                                    type="text" placeholder="City"
                                    value={city} onChange={ev => setCity(ev.target.value)}/>
                            </div>
                            <div className="">
                                <label for="">Zip code</label>
                                <input
                                    type="text" placeholder="Postal Code"
                                    value={zipCode} onChange={ev => setZipCode(ev.target.value)}/>
                            </div>
                        </div>
                        <label for="">Country</label>
                        <input type="text" placeholder="Country"
                        value={country} onChange={ev => setCountry(ev.target.value)}/>
                        <button type="submit">Save</button>
                        <p className="mt-4 text-xs font-semibold text-center text-gray-500 underline">Alugnos cambios se veran reflejados al inciar sesion de nuevo!</p>
                    </form>
                </div>
            </div>
        </section>
    )
};