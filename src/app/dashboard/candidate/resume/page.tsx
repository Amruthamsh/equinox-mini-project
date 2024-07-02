import FetchResumeDetails from "@/components/FetchResumeDetails";
import ResumePlain from "@/components/ResumePlain";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div>
        <FetchResumeDetails />
        <Suspense fallback={<p>Loading...</p>}>
          <ResumePlain />
        </Suspense>
      </div>
    </>
  );
}
