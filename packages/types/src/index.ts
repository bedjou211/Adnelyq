export type OrganizationRole =
  | "OWNER"
  | "ADMIN"
  | "MARKETING"
  | "SUPPORT"
  | "VIEWER";

export type StoreStatus = "DRAFT" | "ACTIVE" | "PAUSED";
export type SupportedLocale = "fr" | "ar" | "en";

export interface Money {
  amount: number;
  currency: string;
}

export interface TenantContext {
  user_id: string;
  organization_id: string;
  role: OrganizationRole;
}

export interface StoreSummary {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  currency: string;
  status: StoreStatus;
}
