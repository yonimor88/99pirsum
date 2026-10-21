import { Dots } from "@/components/brand/ornaments";
import { Marquee } from "@/components/ui/marquee";
import { allCityNames } from "@/content/cities";
import { serviceNav } from "@/content/service-nav";

/** Two crossed "tapes": cities on ink, services on yellow. */
export function TickerBands() {
  return (
    <section aria-label="ערים ושירותים" className="relative z-10 -mt-6 overflow-hidden py-10 sm:py-14">
      <div className="-rotate-[2deg] scale-x-[1.04] bg-ink py-4 text-paper shadow-[0_20px_40px_-20px_rgba(20,20,20,0.6)] sm:py-5">
        <Marquee duration="50s" trackClassName="gap-8 pe-8">
          {[...allCityNames, "וכל ריכוז חרדי ודתי"].map((city) => (
            <span key={city} className="flex items-center gap-8">
              <span className="font-display text-2xl font-bold whitespace-nowrap sm:text-3xl">{city}</span>
              <Dots size="size-2" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="relative -mt-3 rotate-[1.5deg] scale-x-[1.04] bg-yellow py-3 text-ink sm:py-4">
        <Marquee duration="65s" reverse trackClassName="gap-6 pe-6">
          {serviceNav.map((s) => (
            <span key={s.slug} className="flex items-center gap-6">
              <span className="font-display text-lg font-semibold whitespace-nowrap sm:text-xl">{s.title}</span>
              <span className="text-xl" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
