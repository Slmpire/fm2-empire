// ============================================================
// FM2 EMPIRE — TEAM PROFILE PAGE (route: /team/[slug])
// One page generated per team member. generateStaticParams
// pre-builds a page for every person in lib/data.ts.
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamMembers } from "@/lib/data";
import TeamProfileContent from "@/components/pages/TeamProfileContent";

export async function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return { title: "Team Member Not Found" };
  }

  return {
    title: member.name,
    description: member.bio,
  };
}

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return <TeamProfileContent member={member} />;
}