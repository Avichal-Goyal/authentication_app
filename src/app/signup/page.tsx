"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";


export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp successfull", response.data);
            router.push("/login");
        }
        catch (error: any) {
            console.log("Sign up failed", error.message);

            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">{loading ? "Processing" : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
            className="border border-gray-300 rounded-md p-2 w-64 items-center"
            id="username"
            type="text"
            placeholder="username"
            onChange = {(e) => setUser({...user, username: e.target.value})} />
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
            onClick={onSignup}
            className="bg-blue-500 text-white rounded-md p-2 w-64">{buttonDisabled ? "No SignUp" : "SignUp"}</button>
            <Link href="/login" className="text-blue-500">Already have an account? Login</Link>
        </div>
    )
}