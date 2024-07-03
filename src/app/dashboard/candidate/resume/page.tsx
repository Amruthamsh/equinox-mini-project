import FetchResumeDetails from "@/components/Candidate/FetchResumeDetails";
import ResumePlain from "@/components/Candidate/ResumePlain";
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
