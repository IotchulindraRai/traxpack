interface ProtectedLayoutProps {
    children: React.ReactNode;
}
export default function ProtectedLayout ({children}: ProtectedLayoutProps) {
    return(
            <div className="h-full w-full" suppressHydrationWarning>
                <div className="flex flex-col gap-y-10 px-4 items-center py-10">
                    {children}
                </div>
            </div>
    )
}
