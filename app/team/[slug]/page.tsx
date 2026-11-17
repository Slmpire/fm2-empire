import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTeamMemberBySlug, getActiveTeamMembers, type CMSTeamMember } from "@/lib/cms";
import { teamMembers as fallbackTeamMembers } from "@/lib/data";
import TeamProfileContent from "@/components/pages/TeamProfileContent";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const members = await getActiveTeamMembers();
    return members.map((m) => ({ slug: m.slug }));
  } catch {
    return fallbackTeamMembers.map((m) => ({ slug: m.slug }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug).catch(() => null);

  if (!member) {
    const fallback = fallbackTeamMembers.find((m) => m.slug === slug);
    if (fallback) {
      return { title: fallback.name, description: fallback.bio };
    }
    return { title: "Team Member Not Found" };
  }

  return { title: member.name, description: member.bio ?? undefined };
}

export default async function TeamProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [member, allMembers] = await Promise.all([
    getTeamMemberBySlug(slug).catch(() => null),
    getActiveTeamMembers().catch((): CMSTeamMember[] => []),
  ]);

  if (!member) {
    const fallback = fallbackTeamMembers.find((m) => m.slug === slug);
    if (!fallback) notFound();
    return <TeamProfileContent member={fallback} allMembers={allMembers} />;
  }

  // Convert CMSTeamMember to shape TeamProfileContent expects
  const memberForProfile = {
    id:       member.id,
    slug:     member.slug,
    name:     member.name,
    role:     member.role,
    bio:      member.bio ?? "",
    longBio:  member.long_bio ?? undefined,
    imageUrl: member.image_url ?? "",
    socials: {
      instagram: member.instagram ?? undefined,
      twitter:   member.twitter   ?? undefined,
      linkedin:  member.linkedin  ?? undefined,
    },
  };

  return <TeamProfileContent member={memberForProfile} allMembers={allMembers} />;
}
