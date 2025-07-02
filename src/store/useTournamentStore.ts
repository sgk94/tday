import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Tournament } from "../types/tournament";

export type TournamentStore = {
  tournaments: Tournament[];
  isLoading: boolean;
  error: string | null;
  setTournaments: (tournaments: Tournament[]) => void;
  addTournament: (tournament: Tournament) => void;
  fetchTournaments: () => Promise<void>;
};

export const useTournamentStore = create<TournamentStore>((set) => ({
  tournaments: [],
  isLoading: false,
  error: null,
  setTournaments: (tournaments) => set({ tournaments }),
  addTournament: (tournament) =>
    set((state) => ({
      tournaments: [...state.tournaments, tournament],
    })),
  fetchTournaments: async () => {
    set({ isLoading: true, error: null });
    try {
      const snapshot = await getDocs(collection(db, "tournaments"));
      const data: Tournament[] = snapshot.docs.map((doc) => {
        const tournament = doc.data();
        return {
          id: doc.id,
          name: tournament.name,
          location: tournament.location,
          participants: tournament.participants,
          price: tournament.price,
          dateRange: tournament.dateRange,
          createdAt: tournament.createdAt,
          isActive: tournament.isActive,
          slug: tournament.slug,
        };
      });
      set({ tournaments: data });
    } catch (err) {
      console.error("Error fetching tournaments:", err);
      set({ error: "Failed to fetch tournaments." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
