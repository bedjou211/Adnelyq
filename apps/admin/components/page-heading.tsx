import type { ReactNode } from "react";

export function PageHeading({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div>{eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-brand">{eyebrow}</p>}<h1 className="text-3xl font-semibold tracking-[-.035em]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p></div>{actions}</div>;
}
