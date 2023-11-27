export interface Post {
  id: string /* primary key */;
  title: string;
  description: string;
  image: string;
  content: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
}
