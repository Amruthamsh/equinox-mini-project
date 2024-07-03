import FetchResumeDetails from "@/components/Candidate/FetchResumeDetails";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";

export default async function Page() {
  //First Get Key Resume details from the database and store it in the form input values
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  await dbConnect();

  const candidate = await Candidate.findOne({ kindeAuthId: user.id });
  const resumeDetails = candidate?.toJSON();

  return (
    <div>
      {resumeDetails && (
        <div className="overflow-auto mt-2 max-h-full p-4 border border-gray-400 rounded">
          <div className="text-lg font-bold mb-2">
            Details extracted from your Resume
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Title:</h3>
            <p>{resumeDetails.title}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Summary:</h3>
            <p> {resumeDetails.summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Education:</h3>
            <ul>
              {resumeDetails.education.map((item, index) => (
                <li key={index}>
                  {item.institution} ({item.degree})
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Skills:</h3>
            <ul>
              {resumeDetails.skills.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Experience:</h3>
            <ul>
              {resumeDetails.experience.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <FetchResumeDetails />
    </div>
  );
}

/*
<div className="overflow-auto mt-8 max-h-full p-4 border border-gray-400 rounded">
            <h2 className="text-lg font-bold mb-2">Resume Details:</h2>
            <div className="mb-4">
              <h3 className="font-bold">Title:</h3>
              <p>{resumeDetails.title}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Summary:</h3>
              <p>{resumeDetails.summary}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Education:</h3>
              <ul>
                {resumeDetails.education.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Skills:</h3>
              <ul>
                {resumeDetails.skills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Experience:</h3>
              <ul>
                {resumeDetails.experience.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Years of Experience:</h3>
              <p>{resumeDetails.years_of_experience}</p>
            </div>
          </div>
    */
