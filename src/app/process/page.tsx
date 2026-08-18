import type { Metadata } from "next";
import ProcessJourney from "@/components/process/ProcessJourney";

export const metadata: Metadata = {
  title: "The Journey — OKNO Modhomes",
  description:
    "Follow the first stages of an OKNO home from land selection through architectural design and into precision manufacturing.",
};

export default function ProcessPage() {
  return <ProcessJourney />;
}
