import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toSlug } from "../lib/toSlug";
import type { DateRange } from "react-day-picker";
import DatePickerField from "../components/DatePickerField";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader } from "lucide-react";
import { db } from "../firebase/config";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

export default function CreateTournamentPage() {
  const [date, setDate] = useState<DateRange>();
  const [tournamentName, setTournamentName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [participants, setParticipants] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const slugExists = async (slug: string) => {
    const q = query(collection(db, "tournaments"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) {
      alert("You must be signed in");
      return;
    }

    const slug = toSlug(tournamentName);

    e.preventDefault();
    setIsLoading(true);

    const exists = await slugExists(slug);

    if (!exists) {
      try {
        await addDoc(collection(db, "tournaments"), {
          name: tournamentName,
          location,
          participants: Number(participants),
          price: Number(price),
          dateRange: {
            from: date?.from?.toISOString() || null,
            to: date?.to?.toISOString() || null,
          },
          createdAt: new Date().toISOString(),
          isActive: true,
          slug: slug,
          organizerIds: [user.uid],
        });
      } catch (error) {
        console.error("error adding document: ", error);
        alert("Failed to create tournament.");
      } finally {
        setIsLoading(false);
        navigate("/dashboard");
      }
    } else {
      alert(
        "This tournament name already exists. Please use a different name."
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-neutral-800">
        <button onClick={() => navigate(-1)}>
          <div className="flex gap-2">
            <ChevronLeft />
            back
          </div>
        </button>
        <h1 className="mb-2 mt-2 flex justify-center text-xl">
          Create New Tournament
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex max-w-[500px] flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label>Tournament Name</label>
              <input
                className="rounded-md border border-neutral-300 p-2"
                placeholder="e.g. Master Cho's Fight to death"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Date</label>
              <DatePickerField
                value={date}
                onChange={setDate}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Location</label>
              <input
                className="rounded-md border border-neutral-300 p-2"
                placeholder="Seattle"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Number of Participants</label>
              <input
                className="rounded-md border border-neutral-300 p-2"
                placeholder="100"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Price ($)</label>
              <input
                className="rounded-md border border-neutral-300 p-2"
                placeholder="50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button
              className="rounded-lg border-2 border-solid border-neutral-700 p-1 hover:border-neutral-950 hover:bg-neutral-100 hover:text-neutral-950"
              type="submit"
            >
              {isLoading ? (
                <div className="flex justify-center gap-2">
                  <Loader className="animate-spin" />
                  <span>Submitting ...</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
