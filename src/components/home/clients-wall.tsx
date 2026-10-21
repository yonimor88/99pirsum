import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import { clients, type Client } from "@/content/clients";

function LogoCard({ client }: { client: Client }) {
  return (
    <div className="group grid h-24 w-44 shrink-0 place-items-center rounded-2xl border border-ink/8 bg-white px-5 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(20,20,20,0.5)] sm:h-28 sm:w-52">
      <Image
        src={client.logo}
        alt={client.name}
        width={176}
        height={Math.round((176 * client.logo.height) / client.logo.width)}
        className="max-h-14 w-auto max-w-full object-contain opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-16"
      />
    </div>
  );
}

export function ClientsWall() {
  const half = Math.ceil(clients.length / 2);
  return (
    <div className="space-y-4 [mask-image:linear-gradient(to_left,transparent,black_10%,black_90%,transparent)]">
      <Marquee duration="45s" trackClassName="gap-4 pe-4">
        {clients.slice(0, half).map((c) => (
          <LogoCard key={c.name} client={c} />
        ))}
      </Marquee>
      <Marquee duration="52s" reverse trackClassName="gap-4 pe-4">
        {clients.slice(half).map((c) => (
          <LogoCard key={c.name} client={c} />
        ))}
      </Marquee>
    </div>
  );
}
