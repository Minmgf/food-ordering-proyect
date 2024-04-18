import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";
import toast from "react-hot-toast";

export default function UserForm({ user, onSave }) {
    console.log(user);
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [zipCode, setZipCode] = useState(user?.zipCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();



    return (
        <div className="flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[180px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={ev => {
                    ev.preventDefault(); // Prevent default form submission
                    onSave(ev, {
                        name:userName,
                        image,
                        phone,
                        streetAddress,
                        zipCode,
                        city,
                        country,
                        admin
                    });
                }}
            >
                <label htmlFor="name">First and last name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="First and last name"
                    value={userName}
                    onChange={ev => setUserName(ev.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    value={user?.email || ''} // Check user is defined before accessing email
                    disabled={true}
                />
                <label htmlFor="phone">Phone number</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={ev => setPhone(ev.target.value)}
                />
                <label htmlFor="address">Street Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Street address"
                    value={streetAddress}
                    onChange={ev => setStreetAddress(ev.target.value)}
                />
                <div className="grid grid-cols-2 gap-x-4">
                    <div >
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="City"
                            value={city}
                            onChange={ev => setCity(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="zipcode">Zip code</label>
                        <input
                            type="text"
                            id="zipcode"
                            placeholder="Postal Code"
                            value={zipCode}
                            onChange={ev => setZipCode(ev.target.value)}
                        />
                    </div>
                </div>
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    placeholder="Country"
                    value={country}
                    onChange={ev => setCountry(ev.target.value)}
                />
                {loggedInUserData?.admin && (
                <div className="">
                    <label htmlFor={'adminCB'} className="inline-flex items-center gap-2 p-2 mb-2">
                        <input
                            type="checkbox" className="" id="adminCB" value={'1'}
                            checked={admin}
                            onClick={ev => setAdmin(ev.target.checked)}
                            />

                        <span>Admin</span>
                    </label>
                </div>
                )}
                <button type="submit">Save</button>
                <p className="mt-4 text-xs font-semibold text-center text-gray-500 underline">Algunos cambios se verán reflejados al iniciar sesión de nuevo.</p>
            </form>
        </div>
    );
}
