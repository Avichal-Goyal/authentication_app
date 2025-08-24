"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import { axios } from "axios";


export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const onLogin = async () => {

    }
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Login</h1>
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
            className="bg-blue-500 text-white rounded-md p-2 w-64">Login</button>
            <Link href="/signup" className="text-blue-500">Don't have an account? Sign Up</Link>
        </div>
    )
}