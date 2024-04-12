'use client'
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export default function NewMenuItemPage() {

    const {loading, data} = useProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const  data = {image, name, description, basePrice};
        const savingPromise = new Promise ( async( resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving item',
            success: 'Saved!',
            error: 'Error saving data'
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
      }

    if(loading){
        return 'Loading user info...';
    }
    if(!data.admin){
        return 'Not an admin.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left/>
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form className="max-w-md mx-auto mt-8" onSubmit={handleFormSubmit}>
                <div className="grid items-start gap-4" style={{gridTemplateColumns: '.5fr .5fr'}}>
                    <div className="">
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Menu item name</label>
                        <input
                            value={name}
                            onChange={ ev => setName(ev.target.value)}
                            type="text"
                        />
                        <label>Description</label>
                        <input
                            value={description}
                            onChange={ ev => setDescription(ev.target.value)}
                            type="text"
                        />
                        <label>Base price</label>
                        <input
                            value={basePrice}
                            onChange={ ev => setBasePrice(ev.target.value)}
                            type="text"
                        />
                        <button type="submit" className="">Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}
