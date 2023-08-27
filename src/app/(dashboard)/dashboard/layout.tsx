import DashboardNavBar from "@/components/layout/dashboard-nav-bar";
import SideBar from "@/components/layout/side-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="min-h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-1">
        <DashboardNavBar />
        {children}
      </div>
    </main>
  );
}
