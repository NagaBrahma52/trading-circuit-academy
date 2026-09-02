import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}