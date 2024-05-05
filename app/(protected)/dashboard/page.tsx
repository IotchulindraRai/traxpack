import AddLuggage from "@/components/dashboard/AddLuggage";
import ListLuggage from "@/components/dashboard/ListLuggage";

export default function Dashboard() {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
            <div className="w-fit">
                <AddLuggage />
            </div>
            <ListLuggage />

        </div>
    )
}
