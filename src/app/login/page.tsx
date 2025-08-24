"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successfull", response.data);
            toast.success("Login Success")
            router.push("/profile");
        }
        catch (error: any) {
            console.log("Login failed", error.message);

            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
            className="border border-gray-300 rounded-md p-2 w-64 items-center"
            id="email"
            type="text"
            placeholder="email"
            onChange = {(e) => setUser({...user, email: e.target.value})} />
            <label htmlFor="password">password</label>
            <input
            className="border border-gray-300 rounded-md p-2 w-64 items-center"
            id="password"
            type="password"
            placeholder="password"
            onChange = {(e) => setUser({...user, password: e.target.value})} />
            <button
            onClick={onLogin}
            className="bg-blue-500 text-white rounded-md p-2 w-64">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup" className="text-blue-500">Don't have an account? Sign Up</Link>
        </div>
    )
}