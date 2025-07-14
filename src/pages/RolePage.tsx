import competitor from "../../public/competitor.png";
import organizer from "../../public/organizer.png";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RolePage() {
  const navigate = useNavigate();
  const functions = getFunctions(app);
  const setUserRole = httpsCallable(functions, "setUserRole");

  const { user } = useAuth();

  const handleRoleClick = async (role: string) => {
    if (!user) return;

    try {
      await setUserRole({ uid: user?.uid, role: role });
      await user.getIdToken(true);
      console.log(`${role} role assigned`);
      navigate("/dashboard");
    } catch (error) {
      console.error(`failed to assign the role ${role}`, error);
    }
  };

  return (
    <>
      <h1>Welcome to T Day!</h1>
      <h2 className="mb-4">Please choose a role below</h2>
      <div className="flex justify-center gap-8">
        <button
          onClick={() => handleRoleClick("competitor")}
          className="flex flex-col rounded-md border-2 border-red-400 text-center"
        >
          <img
            src={competitor}
            alt="competitor"
            className="block h-[300px] w-full flex-1 rounded-t-md object-contain"
          />
          <div className="p-2">Competitor</div>
        </button>
        <button
          onClick={() => handleRoleClick("organizer")}
          className="flex flex-col rounded-md border-2 border-blue-400 text-center"
        >
          <img
            src={organizer}
            alt="organizer"
            className="block h-[300px] w-full flex-1 rounded-t-md object-contain"
          />
          <div className="p-2">Organizer</div>
        </button>
      </div>
    </>
  );
}
