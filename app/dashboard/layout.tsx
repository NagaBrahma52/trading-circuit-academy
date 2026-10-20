import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/profile";
import DashboardLayout from "../components/layout/DashboardLayout";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Belt-and-suspenders: middleware.ts already redirects unauthenticated
    // requests to /login, this is the Server Component-side check.
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await getCurrentProfile();

    return (
        <DashboardLayout
            user={{ email: user.email ?? "", name: profile?.full_name ?? user.user_metadata?.full_name, role: profile?.role === "admin" ? "admin" : "user" }}
            isAdmin={profile?.role === "admin"}
        >
            {children}
        </DashboardLayout>
    );
}
