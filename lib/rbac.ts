// ============================================================
// FM2 EMPIRE — ROLE-BASED ACCESS CONTROL
// Single source of truth for all permissions.
// Every admin page and action checks against this file.
// To change what a role can do — edit here only.
// ============================================================

export type AdminRole =
  | "super_admin"
  | "admin"
  | "reviewer"
  | "events_manager"
  | "media_manager"
  | "read_only";

// ------------------------------------------------------------
// PERMISSION DEFINITIONS
// Each permission maps to a specific capability in the admin.
// ------------------------------------------------------------

export type Permission =
  | "view_dashboard"
  | "view_applications"
  | "update_application_status"
  | "add_application_notes"
  | "view_events"
  | "create_event"
  | "edit_event"
  | "delete_event"
  | "view_media"
  | "create_media"
  | "edit_media"
  | "delete_media"
  | "view_team"
  | "create_team_member"
  | "edit_team_member"
  | "delete_team_member"
  | "view_news"
  | "create_post"
  | "edit_post"
  | "delete_post"
  | "view_tickets"
  | "view_settings"
  | "manage_admin_users";

// ------------------------------------------------------------
// ROLE → PERMISSIONS MAP
// Add a permission to a role array to grant access.
// Remove it to revoke. Simple, readable, auditable.
// ------------------------------------------------------------

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: [
    "view_dashboard",
    "view_applications",
    "update_application_status",
    "add_application_notes",
    "view_events",
    "create_event",
    "edit_event",
    "delete_event",
    "view_media",
    "create_media",
    "edit_media",
    "delete_media",
    "view_team",
    "create_team_member",
    "edit_team_member",
    "delete_team_member",
    "view_news",
    "create_post",
    "edit_post",
    "delete_post",
    "view_tickets",
    "view_settings",
    "manage_admin_users",
  ],

  admin: [
    "view_dashboard",
    "view_applications",
    "update_application_status",
    "add_application_notes",
    "view_events",
    "create_event",
    "edit_event",
    "delete_event",
    "view_media",
    "create_media",
    "edit_media",
    "delete_media",
    "view_team",
    "create_team_member",
    "edit_team_member",
    "delete_team_member",
    "view_news",
    "create_post",
    "edit_post",
    "delete_post",
    "view_tickets",
    "view_settings",
    // NO manage_admin_users
  ],

  reviewer: [
    "view_dashboard",
    "view_applications",
    // NO update_application_status
    "add_application_notes",
    "view_events",
    "view_media",
    "view_team",
    "view_news",
    "view_tickets",
    // NO create/edit/delete anything
    // NO settings
  ],

  events_manager: [
    "view_dashboard",
    "view_applications",
    "view_events",
    "create_event",
    "edit_event",
    "delete_event",
    "view_tickets",
    "view_settings",
    // NO media, team, news, applications management
  ],

  media_manager: [
    "view_dashboard",
    "view_media",
    "create_media",
    "edit_media",
    "delete_media",
    "view_news",
    "create_post",
    "edit_post",
    "delete_post",
    "view_settings",
    // NO applications, events, team management
  ],

  read_only: [
    "view_dashboard",
    "view_applications",
    "view_events",
    "view_media",
    "view_team",
    "view_news",
    "view_tickets",
    // NO create/edit/delete/update anything
  ],
};

// ------------------------------------------------------------
// PERMISSION CHECKER
// Use this everywhere in the admin panel.
// hasPermission(role, "delete_event") → true | false
// ------------------------------------------------------------

export function hasPermission(
  role: AdminRole | null | undefined,
  permission: Permission
): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

// ------------------------------------------------------------
// MULTIPLE PERMISSION CHECK
// hasAnyPermission(role, ["create_event", "edit_event"])
// Returns true if the role has at least one of the listed
// permissions. Useful for showing/hiding nav items.
// ------------------------------------------------------------

export function hasAnyPermission(
  role: AdminRole | null | undefined,
  permissions: Permission[]
): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

// ------------------------------------------------------------
// NAV ITEM VISIBILITY
// Maps each sidebar link to the permission needed to see it.
// ------------------------------------------------------------

export const NAV_PERMISSIONS: Record<string, Permission> = {
  "/admin/dashboard":    "view_dashboard",
  "/admin/applications": "view_applications",
  "/admin/events":       "view_events",
  "/admin/media":        "view_media",
  "/admin/team":         "view_team",
  "/admin/news":         "view_news",
  "/admin/settings":     "view_settings",
};

// ------------------------------------------------------------
// ROLE LABELS — for display in the UI
// ------------------------------------------------------------

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin:    "Super Admin",
  admin:          "Admin",
  reviewer:       "Reviewer",
  events_manager: "Events Manager",
  media_manager:  "Media Manager",
  read_only:      "Read Only",
};

// ------------------------------------------------------------
// ROLE COLOURS — for badges in the UI
// ------------------------------------------------------------

export const ROLE_COLOURS: Record<AdminRole, string> = {
  super_admin:    "#C9A84C",
  admin:          "#3498DB",
  reviewer:       "#9B59B6",
  events_manager: "#27AE60",
  media_manager:  "#E67E22",
  read_only:      "#888880",
};