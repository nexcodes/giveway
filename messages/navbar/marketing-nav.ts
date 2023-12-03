import { Content } from "@/types/content";
import { NavItem } from "@/types/nav-items";

type Items = {
  [key: string]: NavItem[];
};

export const content: Content = {
    en: {
        Dashboard: "Dashboard",
        SignIn: "Sign In",
    },
    fr: {
        Dashboard: "Tableau de bord",
        SignIn: "Se connecter",
    }
}

export const links: Items = {
  en: [
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Prizes",
      href: "/prize",
    },
  ],
  fr: [
    {
      title: "Tarification",
      href: "/pricing",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Prix",
      href: "/prize",
    },
  ],
};
