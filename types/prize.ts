export interface Prize {
    id: string;
    title: string | null;
    image: string | null;
    winner: string | null;
    time_end: Date | null;
    participants: string[] | null;
    credit_need: number;
}