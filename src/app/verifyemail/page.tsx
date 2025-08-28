"use client"

import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function verifyEmailPage() {

    const [token, setToken] = useState("");
    const [isVerified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }


    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>
            {isVerified && (
                <>
                    <p className="text-green-500">Email verified successfully!</p>
                    <Link href="/login" className="text-blue-500">Go to Login</Link>
                </>
            )}
            {error && (
                <p className="text-red-500">Failed to verify email. Please try again.</p>
            )}
        </div>
    )
}