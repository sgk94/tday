import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Loader } from "lucide-react";
import { useTournamentStore } from "../store/useTournamentStore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Tournament } from "../types/tournament";
import { format } from "date-fns";

export default function TournamentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tournament = useTournamentStore((s) => s.getCachedTournament(slug!));
  const [isLoading, setIsLoading] = useState(() => !tournament);
  const cacheTournament = useTournamentStore((s) => s.cacheTournament);

  const formattedDateRangeFrom = tournament?.dateRange.from
    ? format(new Date(tournament.dateRange.from), "MM/dd/yyyy")
    : "N/A";

  const formattedDateRangeTo = tournament?.dateRange.to
    ? format(new Date(tournament.dateRange.to), "MM/dd/yyyy")
    : "N/A";

  useEffect(() => {
    if (!tournament) {
      const fetchTournament = async () => {
        setIsLoading(true);
        const q = query(
          collection(db, "tournaments"),
          where("slug", "==", slug)
        );
        const snapshot = await getDocs(q);
        const doc = snapshot.docs[0];

        if (doc) {
          cacheTournament(slug!, { id: doc.id, ...doc.data() } as Tournament);
        }

        setIsLoading(false);
      };

      fetchTournament();
    }
  }, [slug, tournament, cacheTournament]);

  if (!isLoading && !tournament) {
    return (
      <div className="p-4 text-center text-red-600">Tournament not found.</div>
    );
  }

  const deleteTournament = async (id: string) => {
    const ref = doc(db, "tournaments", id);
    try {
      await deleteDoc(ref);

      navigate("/dashboard");
      console.log("Tournament deleted!");
    } catch (error) {
      console.error("Failed to delete tournament:", error);
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <div className="flex gap-2">
          <ChevronLeft />
          back
        </div>
      </button>

      {isLoading ? (
        <div className="flex justify-center gap-2 p-8">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading ...</span>
        </div>
      ) : (
        <div className="p-4">
          <div className="max-w-xl space-y-4">
            <h1 className="text-2xl font-bold">{tournament?.name}</h1>

            <div className="grid max-w-[350px] grid-cols-[150px_1fr] gap-y-2 rounded-md border-2 border-blue-800 p-2 shadow-md">
              <div className="w-[20px] text-gray-600">Location:</div>
              <div>{tournament?.location}</div>

              <div className="text-gray-600">Participants:</div>
              <div>{tournament?.participants}</div>

              <div className="text-gray-600">Price:</div>
              <div>${tournament?.price}</div>

              <div className="text-gray-600">Start Date:</div>
              <div>{formattedDateRangeFrom}</div>

              <div className="text-gray-600">End Date:</div>
              <div>{formattedDateRangeTo}</div>

              <div className="text-gray-600">Status:</div>
              <div>{tournament?.isActive ? "Active" : "Inactive"}</div>
              <div></div>
              <div className="flex justify-end gap-3">
                <Link
                  className="mt-2 inline-flex h-[32px] w-[60px] items-center justify-center rounded-md bg-blue-700 text-white hover:bg-blue-800 hover:text-neutral-100"
                  to={`/tournaments/${tournament?.slug}/edit`}
                  state={{ tournament }}
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    if (tournament?.id) {
                      deleteTournament(tournament.id);
                    }
                  }}
                  className="mt-2 inline-flex h-[32px] w-[60px] items-center justify-center rounded-md bg-red-700 text-white hover:bg-red-800 hover:text-neutral-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
