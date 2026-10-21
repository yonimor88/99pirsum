import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";

import { Dots } from "@/components/brand/ornaments";
import { ButtonLink } from "@/components/ui/button";
import { serviceNav } from "@/content/service-nav";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44">
      <div aria-hidden className="halftone halftone-fade absolute -top-20 -right-20 size-[30rem] text-ink/12" />
      <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative -rotate-3 bg-white p-8 pb-16 shadow-[0_30px_60px_-30px_rgba(20,20,20,0.5)] [clip-path:polygon(0_0,100%_0,100%_86%,92%_90%,84%_85%,76%_92%,66%_86%,56%_93%,46%_87%,36%_94%,26%_88%,16%_93%,8%_87%,0_92%)]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-6" aria-hidden />
            <Dots />
            <p className="mt-6 font-display text-[7rem] leading-none font-black tabular-nums" dir="ltr">
              404
            </p>
            <p className="mt-4 font-display text-xl font-bold">העמוד לא נמצא</p>
          </div>
        </div>
        <div>
          <h1 className="text-5xl leading-[1.05] font-black sm:text-6xl">המודעה הזו נקרעה.</h1>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-muted">
            גם לנו זה קורה. ההבדל? אצלנו מודעה שנקרעת — מודבקת מחדש. בינתיים, הנה כמה מקומות טובים להמשיך מהם:
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              לדף הבית
              <ArrowUpLeft className="size-5" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              צור קשר
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {serviceNav.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition hover:border-ink">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
