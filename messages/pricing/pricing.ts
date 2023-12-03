import { Content } from "@/types/content";

type Pricing = {
  [key: string]: {
    title: string;
    bill: string;
    button: string;
    price: string;
    features: { content: string; check: boolean }[];
  };
};

export const content: Content = {
  en: {
    title: "Simple, transparent pricing",
    subtitle: "Unlock all features & participate in lucky draws",
  },
  fr: {
    title: "Tarification simple et transparente",
    subtitle:
      "Déverrouillez toutes les fonctionnalités et participez aux tirages au sort",
  },
};

export const pricing_1: Pricing = {
  en: {
    title: "What's included in the Premium plan",
    bill: "Billed Monthly",
    button: "Get Started",
    price: "$29",
    features: [
      { content: "500 Credits", check: true },
      { content: "Daily free Coupons", check: true },
      { content: "Daily 15 free credits", check: true },
      { content: "Access to Random Draw", check: true },
    ],
  },
  fr: {
    title: "Ce qui est inclus dans le plan Premium",
    bill: "Facturé mensuellement",
    button: "Commencer",
    price: "29$",
    features: [
      { content: "500 crédits", check: true },
      { content: "Coupons gratuits quotidiens", check: true },
      { content: "15 crédits gratuits par jour", check: true },
      { content: "Accès au tirage au sort", check: true },
    ],
  },
};

export const pricing_2: Pricing = {
  en: {
    title: "What's included in the Pro plan",
    bill: "Billed Monthly",
    button: "Get Started",
    price: "$19",
    features: [
      { content: "300 Credits", check: true },
      { content: "Weekly free Coupons", check: true },
      { content: "Daily 10 free credits", check: true },
      { content: "Access to Random Draw", check: true },
    ],
  },
  fr: {
    title: "Ce qui est inclus dans le plan Pro",
    bill: "Facturé mensuellement",
    button: "Commencer",
    price: "19$",
    features: [
      { content: "300 crédits", check: true },
      { content: "Coupons gratuits hebdomadaires", check: true },
      { content: "10 crédits gratuits par jour", check: true },
      { content: "Accès au tirage au sort", check: true },
    ],
  },
};
