export default function AuthLayout ({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <div className="h-full w-full flex items-center justify-center bg-white">
        {children}
        </div>
    )
}
