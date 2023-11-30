export interface Prize {
  id: string;
  title: string | null;
  image: string | null;
  winner: string | null;
  time_end: string | null;
  participants: string[] | null;
  credit_need: number | null;
  author_id: string | null;
}
