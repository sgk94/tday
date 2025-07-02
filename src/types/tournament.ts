export type Tournament = {
  id: string;
  name: string;
  location: string;
  participants: number;
  price: number;
  dateRange: {
    from: string | null;
    to: string | null;
  };
  createdAt: string;
  isActive: boolean;
  slug: string;
};
