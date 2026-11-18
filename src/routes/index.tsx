import { createFileRoute } from "@tanstack/react-router";
import { MotionPreferenceProvider } from "@/lib/motion-preference";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { Manifesto } from "@/components/landing/Manifesto";
import { Catalog } from "@/components/landing/Catalog";
import { ModelOfMonth } from "@/components/landing/ModelOfMonth";
import { TopPhotos } from "@/components/landing/TopPhotos";
import { School } from "@/components/landing/School";
import { Steps } from "@/components/landing/Steps";
import { Projects } from "@/components/landing/Projects";
import { Award } from "@/components/landing/Award";
import { Apply } from "@/components/landing/Apply";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ANDRES — виртуальное модельное агентство. Новые лица" },
      {
        name: "description",
        content:
          "ANDRES ищет новые лица в Алматы, Астане и Шымкенте: без опыта и вложений, ТФП-портфолио, оплачиваемые съемки и ответ агента за 48 часов.",
      },
      { property: "og:title", content: "ANDRES — новые лица" },
      {
        property: "og:description",
        content: "Виртуальное модельное агентство: подайте анкету онлайн и начните карьеру модели без опыта.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionPreferenceProvider>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Manifesto />
        <Catalog />
        <ModelOfMonth />
        <TopPhotos />
        <Steps />
        <Projects />
        <Award />
        <School />
        <Apply />
      </main>
      <Footer />
    </MotionPreferenceProvider>
  );
}
