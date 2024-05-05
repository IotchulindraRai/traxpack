interface ProtectedLayoutProps {
    children: React.ReactNode;
}
export default function ProtectedLayout ({children}: ProtectedLayoutProps) {
    return(
    <div className="h-full w-full bg-white bg-grid-small-black/[0.2] relative flex items-center justify-center" suppressHydrationWarning>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500 py-8">
            {children}
        </div>
    </div>
)
}
