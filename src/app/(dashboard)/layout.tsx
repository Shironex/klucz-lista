import DashboardNavBar from "@/components/layout/dashboard-nav-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <DashboardNavBar />
      {children}
    </div>
  );
}
