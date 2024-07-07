import EmployerAuthDetail from "@/components/Employer/EmployerAuthDetail";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 h-16">
        <EmployerAuthDetail />
      </div>
      <div>{children}</div>
    </div>
  );
}
