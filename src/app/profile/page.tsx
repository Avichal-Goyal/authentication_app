"use client"
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState("");
    const logout = async () => {
        try {
            const response =await axios.get('/api/users/logout');
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error("Failed to log out");
        }
    }
    const getUserData = async () =>  {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setUserData(res.data.data._id);
        } catch(error: any) {
            toast.error(error.response?.data?.error || "Failed to fetch user data");
        }

    }
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Profile</h1>
            <hr />
            <p>Welcome to your profile page!</p>
            <hr />
            <h2 className="text-xl font-semibold text-blue-400">{userData === "" ? "No Data Found" : <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>
            <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
            <button
            onClick={getUserData}
            className="bg-blue-500 text-white py-2 px-4 rounded">Get User Details</button>
        </div>
    )
}