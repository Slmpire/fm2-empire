// ============================================================
// FM2 EMPIRE — CMS DATA FUNCTIONS
// Reads from Supabase tables instead of lib/data.ts.
// Public functions use the anon client (RLS enforced).
// Admin functions use the service role client (full access).
// ============================================================

import { supabase, createAdminClient } from "@/lib/supabase";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

export type CMSMediaItem = {
  id:            string;
  title:         string;
  description:   string | null;
  type:          string;
  thumbnail_url: string | null;
  external_url:  string | null;
  duration:      string | null;
  release_date:  string | null;
  is_premium:    boolean;
  is_published:  boolean;
  sort_order:    number;
  created_at:    string;
  updated_at:    string;
};

export type CMSEvent = {
  id:               string;
  slug:             string;
  title:            string;
  description:      string | null;
  long_description: string | null;
  date:             string;
  time:             string | null;
  venue:            string | null;
  address:          string | null;
  city:             string | null;
  image_url:        string | null;
  ticket_price:     number;
  ticket_url:       string | null;
  status:           string;
  is_featured:      boolean;
  organiser:        string | null;
  is_third_party:   boolean;
  lineup:           string[] | null;
  created_at:       string;
  updated_at:       string;
};

export type CMSTeamMember = {
  id:         string;
  slug:       string;
  name:       string;
  role:       string;
  bio:        string | null;
  long_bio:   string | null;
  image_url:  string | null;
  instagram:  string | null;
  twitter:    string | null;
  linkedin:   string | null;
  sort_order: number;
  is_active:  boolean;
  created_at: string;
  updated_at: string;
};

export type CMSPost = {
  id:           string;
  slug:         string;
  title:        string;
  excerpt:      string | null;
  content:      string | null;
  cover_image:  string | null;
  category:     string;
  is_published: boolean;
  published_at: string | null;
  author_name:  string;
  created_at:   string;
  updated_at:   string;
};

// ------------------------------------------------------------
// PUBLIC: MEDIA ITEMS (anon, RLS: published only)
// ------------------------------------------------------------

export async function getPublishedMedia(limit?: number): Promise<CMSMediaItem[]> {
  let query = supabase
    .from("media_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data as CMSMediaItem[];
}

// ------------------------------------------------------------
// PUBLIC: EVENTS (anon, RLS: all visible)
// ------------------------------------------------------------

export async function getPublishedEvents(): Promise<CMSEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data as CMSEvent[];
}

export async function getEventBySlug(slug: string): Promise<CMSEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as CMSEvent;
}

// ------------------------------------------------------------
// PUBLIC: TEAM MEMBERS (anon, RLS: active only)
// ------------------------------------------------------------

export async function getActiveTeamMembers(): Promise<CMSTeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as CMSTeamMember[];
}

export async function getTeamMemberBySlug(slug: string): Promise<CMSTeamMember | null> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as CMSTeamMember;
}

// ------------------------------------------------------------
// PUBLIC: POSTS (anon, RLS: published only)
// ------------------------------------------------------------

export async function getPublishedPosts(limit?: number): Promise<CMSPost[]> {
  let query = supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data as CMSPost[];
}

export async function getPostBySlug(slug: string): Promise<CMSPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) return null;
  return data as CMSPost;
}

// ------------------------------------------------------------
// ADMIN: ALL MEDIA (service role, no RLS)
// ------------------------------------------------------------

export async function adminGetAllMedia(): Promise<CMSMediaItem[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("media_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as CMSMediaItem[];
}

export async function adminGetMediaItem(id: string): Promise<CMSMediaItem | null> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("media_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as CMSMediaItem;
}

export async function adminSaveMedia(
  data: Partial<CMSMediaItem>,
  id?: string
): Promise<CMSMediaItem> {
  const client = createAdminClient();

  if (id) {
    const { data: updated, error } = await client
      .from("media_items")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated as CMSMediaItem;
  }

  const { data: created, error } = await client
    .from("media_items")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return created as CMSMediaItem;
}

export async function adminDeleteMedia(id: string): Promise<void> {
  const client = createAdminClient();
  const { error } = await client
    .from("media_items")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ------------------------------------------------------------
// ADMIN: ALL EVENTS
// ------------------------------------------------------------

export async function adminGetAllEvents(): Promise<CMSEvent[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data as CMSEvent[];
}

export async function adminGetEvent(id: string): Promise<CMSEvent | null> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as CMSEvent;
}

export async function adminSaveEvent(
  data: Partial<CMSEvent>,
  id?: string
): Promise<CMSEvent> {
  const client = createAdminClient();

  if (id) {
    const { data: updated, error } = await client
      .from("events")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated as CMSEvent;
  }

  const { data: created, error } = await client
    .from("events")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return created as CMSEvent;
}

export async function adminDeleteEvent(id: string): Promise<void> {
  const client = createAdminClient();
  const { error } = await client
    .from("events")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ------------------------------------------------------------
// ADMIN: ALL TEAM MEMBERS
// ------------------------------------------------------------

export async function adminGetAllTeamMembers(): Promise<CMSTeamMember[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as CMSTeamMember[];
}

export async function adminGetTeamMember(id: string): Promise<CMSTeamMember | null> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as CMSTeamMember;
}

export async function adminSaveTeamMember(
  data: Partial<CMSTeamMember>,
  id?: string
): Promise<CMSTeamMember> {
  const client = createAdminClient();

  if (id) {
    const { data: updated, error } = await client
      .from("team_members")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated as CMSTeamMember;
  }

  const { data: created, error } = await client
    .from("team_members")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return created as CMSTeamMember;
}

export async function adminDeleteTeamMember(id: string): Promise<void> {
  const client = createAdminClient();
  const { error } = await client
    .from("team_members")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ------------------------------------------------------------
// ADMIN: ALL POSTS
// ------------------------------------------------------------

export async function adminGetAllPosts(): Promise<CMSPost[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as CMSPost[];
}

export async function adminGetPost(id: string): Promise<CMSPost | null> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as CMSPost;
}

export async function adminSavePost(
  data: Partial<CMSPost>,
  id?: string
): Promise<CMSPost> {
  const client = createAdminClient();

  if (id) {
    const { data: updated, error } = await client
      .from("posts")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated as CMSPost;
  }

  const { data: created, error } = await client
    .from("posts")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return created as CMSPost;
}

export async function adminDeletePost(id: string): Promise<void> {
  const client = createAdminClient();
  const { error } = await client
    .from("posts")
    .delete()
    .eq("id", id);
  if (error) throw error;
}