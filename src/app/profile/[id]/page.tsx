export default function UserProfile({params} : any) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Profile</h1>
            <hr />
            <p className="text-lg">Hello, {params.id}</p>
            <p className="text-lg">Welcome to your profile page!</p>

        </div>
    )
}