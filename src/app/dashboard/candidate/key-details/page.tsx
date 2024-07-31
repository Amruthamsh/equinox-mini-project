import FetchResumeDetails from "@/components/Candidate/FetchResumeDetails";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";
import User from "@/models/user-model";

export default async function Page() {
  //First Get Key Resume details from the database and store it in the form input values

  let resumeDetails = null;

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    await dbConnect();
    const userDB = await User.findOne({ kindeAuthId: user.id });
    const candidate = await Candidate.findById(userDB.candidateId);
    resumeDetails = candidate?.toJSON();
  } catch (e) {
    console.error("Error loading candidate details:", e);
    return null;
  }

  return (
    <>
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
              <h3 className="font-bold text-lg mb-2">Experience:</h3>
              <ul className="list-disc pl-4 mb-0">
                {resumeDetails.experience.map((item, index) => (
                  <li key={index} className="py-2">
                    <p className="text-white">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <FetchResumeDetails />
      </div>
    </>
  );
}
