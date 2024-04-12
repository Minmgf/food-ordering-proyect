'use client';
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";

export default function MenuItesmsPage(){

    const {loading, data} = useProfile();

    if (loading){
        return 'Loading user info...'
    }
    if (!data.admin){
        return 'Not an admin'
    }


    return (
        <section className="max-w-md mx-auto my-8">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link
                className="flex button"
                href={'/menu-items/new'}>Create new menu item
                <span>
                    <Right/>
                </span>
                </Link>

            </div>
        </section>
    )
};