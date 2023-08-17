import NavBar from "@/components/layout/nav-bar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <NavBar />
      {children}
    </div>
  );
}
