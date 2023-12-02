import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";

export const useLanguage = () => {
  const { locale } = useRouter();
  const t = fr; /* 👈 locale === "fr" ? fr : en; */
  return { t, locale };
};
