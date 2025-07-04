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

  // tournament cache
  tournamentCache: Record<string, Tournament>;
  getCachedTournament: (slug: string) => Tournament | undefined;
  cacheTournament: (slug: string, tournament: Tournament) => void;
  updateTournamentInCache: (
    id: string,
    updatedData: Partial<Tournament> & { slug: string }
  ) => void;
};

export const useTournamentStore = create<TournamentStore>((set, get) => ({
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

  // NEW caching state and methods
  tournamentCache: {},
  getCachedTournament: (slug) => get().tournamentCache[slug],
  cacheTournament: (slug, tournament) =>
    set((state) => ({
      tournamentCache: {
        ...state.tournamentCache,
        [slug]: tournament,
      },
    })),
  updateTournamentInCache: (id, updatedData) =>
    set((state) => {
      const existing = state.tournaments.find((t) => t.id === id);
      if (!existing) return {};

      const oldSlug = existing.slug;
      const updatedTournament = { ...existing, ...updatedData, id };
      const newSlug = updatedTournament.slug;

      const newCache = {
        ...state.tournamentCache,
        [newSlug]: updatedTournament,
      };

      if (oldSlug !== newSlug) {
        delete newCache[oldSlug];
      }

      return {
        tournaments: state.tournaments.map((t) =>
          t.id === id ? updatedTournament : t
        ),
        tournamentCache: newCache,
      };
    }),
}));
