import type { ReactNode } from "react";

export type HomeCarouselSlide = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  buttonLabel: string;
  buttonHref: string;
  buttonVariant?: "olive" | "mustard";
};

export const HOME_CAROUSEL_SLIDES: HomeCarouselSlide[] = [
  {
    title: "Olá, Prima!",
    description:
      "A antiga escola primária de Olhão está a transformar-se numa casa de encontro aberta ao mundo.",
    imageSrc: "/images/hero-bg.webp",
    imageAlt: "",
    buttonLabel: "Quem somos",
    buttonHref: "/quem-somos",
    buttonVariant: "mustard",
  },
  {
    id: "viver-o-coletivo",
    title: "Onde a natureza e o brincar livre guiam a descoberta de cada dia.",
    imageSrc: "/images/carousel-slide-nature.webp",
    imageAlt: "Criança descalça a regar plantas numa horta comunitária",
    buttonLabel: "Ver atividades",
    buttonHref: "/viver-o-coletivo",
    buttonVariant: "mustard",
  },
  {
    id: "quem-somos",
    title: "Cuidar da terra, cuidar das pessoas e partilhar o excedente.",
    imageSrc: "/images/carousel-slide-terra.webp",
    imageAlt: "Mãos a colher legumes frescos num cesto de vime na horta",
    buttonLabel: "Apoiar o projeto",
    buttonHref: "/fazer-parte",
    buttonVariant: "mustard",
  },
  {
    id: "corpo",
    title: "Um lugar para regressar às mãos, sentir o corpo e abrandar o ritmo do dia.",
    imageSrc: "/images/carousel-slide-corpo.webp",
    imageAlt: "Bebé a explorar calmamente materiais naturais num cesto de vime",
    buttonLabel: "Ver atividades",
    buttonHref: "/viver-o-coletivo",
    buttonVariant: "mustard",
  },
];
