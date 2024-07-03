import FetchResumeDetails from "@/components/Candidate/FetchResumeDetails";

export default function Page() {
  //First Get Key Resume details from the database and store it in the form input values

  return (
    <div>
      <div>Details extracted from your RESUME</div>

      <p>Upload new Resume: </p>
      <FetchResumeDetails />
    </div>
  );
}
