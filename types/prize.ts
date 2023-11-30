export interface Prize {
  id: string;
  title: string | null;
  description: string | null;
  image: string | null;
  category: string | null;
  prize_value: number | null;
  winner: string | null;
  time_end: string | null;
  participants: string[] | null;
  credit_need: number | null;
  published: boolean | null;
  author_id: string | null;
}
