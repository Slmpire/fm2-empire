import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTeamMemberBySlug, getActiveTeamMembers } from "@/lib/cms";
import TeamProfileContent from "@/components/pages/TeamProfileContent";

export async function generateStaticParams() {
  try {
    const members = await getActiveTeamMembers();
    return members.map((m) => ({ slug: m.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member   = await getTeamMemberBySlug(slug);
  if (!member) return { title: "Team Member Not Found" };
  return { title: member.name, description: member.bio ?? undefined };
}

export default async function TeamProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member   = await getTeamMemberBySlug(slug);
  if (!member) notFound();

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

  return <TeamProfileContent member={memberForProfile} />;
}