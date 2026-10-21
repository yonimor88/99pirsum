import type { ReactNode } from "react";

import { PageHero } from "./page-blocks";

export function LegalPage({
  eyebrow,
  title,
  path,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} crumbs={[{ name: title, path }]} description={`עדכון אחרון: ${updated}`} />
      <section className="pb-24">
        <div className="container-page max-w-3xl">
          <div className="prose-99">{children}</div>
        </div>
      </section>
    </>
  );
}
