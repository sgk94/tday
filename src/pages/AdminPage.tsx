import { useAuth } from "../context/AuthContext";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { app } from "../firebase/config";

export default function Admin() {
  // const functions = getFunctions(app);
  // const setUserRole = httpsCallable(functions, "setUserRole");
  const { user, role } = useAuth();
  console.log(user?.uid);
  // const adminHandler = async () => {
  //   if (!user) return;

  //   try {
  //     await setUserRole({ uid: user?.uid, role: "admin" });
  //     await user.getIdToken(true);
  //     console.log("u r now admin");
  //   } catch (error) {
  //     console.error("failed to make u admin", error);
  //   }
  // };
  return (
    <>
      <h1>admin page</h1>
      <h1>you are logged in with the role: {role}</h1>
    </>
  );
}
