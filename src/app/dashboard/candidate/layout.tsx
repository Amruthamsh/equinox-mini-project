import SideNav from "@/components/ui/SideNav";
import CandidateAuthDetail from "@/components/ui/CandidateAuthDetail";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-col flex-wrap md:w-64 dark:bg-slate-900">
        <div className="flex justify-content-between flex-col h-full">
          <div className="text-center p-4">EQUINOX</div>
          <div>
            <SideNav />
          </div>
          <div className="mt-auto">
            <CandidateAuthDetail />
          </div>
        </div>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
