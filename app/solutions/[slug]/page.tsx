import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions } from "@/data/solutions";
import SolutionDetail from "@/components/solutions/SolutionDetail";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((s) => s.id === slug);

  if (!solution) {
    return {};
  }

  return {
    title: `${solution.name} — Cuxton AI`,
    description: solution.body,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.id === slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetail solution={solution} />;
}
