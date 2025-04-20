import SideBar from "@/components/owner/SideBar";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SideBar />
            <main className="flex-1 min-h-screen bg-white overflow-y-auto">{children}</main>
        </div>
    );
}
