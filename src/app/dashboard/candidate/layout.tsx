import SideNav from "@/components/ui/SideNav";
import CandidateAuthDetail from "@/components/ui/CandidateAuthDetail";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen md:flex-row md:overflow-hidden">
      <div className="hidden md:flex md:w-64 flex-shrink-0 flex-col flex-wrap dark:bg-slate-900">
        <div className="flex justify-between flex-col h-full">
          <div className="text-center p-4">EQUINOX</div>
          <div>
            <SideNav />
          </div>
          <div className="mt-auto">
            <CandidateAuthDetail />
          </div>
        </div>
      </div>
      <div className="bg-black-200 flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
