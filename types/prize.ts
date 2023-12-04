export interface Prize {
  id: string;
  title: string | null;
  description: string | null;
  image: string | null;
  category: string | null;
  prize_value: number | null;
  winner: string | null;
  time_end: string | null;
  created_at: string;
  participants: string | null;
  credit_need: number | null;
  published: boolean | null;
  author_id: string | null;
}

type TextContent = {
  type: "text";
  text: string;
  styles: Record<string, any>;
};

type Paragraph = {
  id: string;
  type: "paragraph";
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: TextContent[];
  children: any[];
};

type Image = {
  id: string;
  type: "image";
  props: {
    backgroundColor: string;
    textAlignment: string;
    url: string;
    caption: string;
    width: number;
  };
  children: any[];
};

type Heading = {
  id: string;
  type: "heading";
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
    level: number;
  };
  content: TextContent[];
  children: any[];
};

type ListItem = {
  id: string;
  type: "bulletListItem" | "numberedListItem";
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: TextContent[];
  children: any[];
};

export type DataItem = Paragraph | Image | Heading | ListItem;