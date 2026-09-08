import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import IndustryDetail from "@/components/industries/IndustryDetail";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((ind) => ind.id === slug);

  if (!industry) {
    return {};
  }

  return {
    title: `${industry.name} — Cuxton AI`,
    description: industry.headline,
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((ind) => ind.id === slug);

  if (!industry) {
    notFound();
  }

  return <IndustryDetail industry={industry} />;
}
