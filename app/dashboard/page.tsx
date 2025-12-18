import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const { user } = session;
    const userData = {
        name: user?.name || "Titan Athlete",
        image: user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Titan"
    };

    return <DashboardClient user={userData} />;
}
