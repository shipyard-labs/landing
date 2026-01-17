import { InfrastructureGrid } from "@/components/infrastructure-grid";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (<main className="relative h-full flex flex-col items-center justify-center bg-[#161616] overflow-hidden">

    {/* Background Layer */}
    <InfrastructureGrid />

    {/* Content Layer (Ensure z-index is higher) */}
    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 gap-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-7xl font-bold tracking-tight text-[#F0EAD6]">
          SHPYRD
        </h1>
        <span className="text-[#A8AAAC] text-4xl font-normal opacity-80" style={{ letterSpacing: "0.01em" }}>A HACKATHON & TALENT PLATFORM</span>
        <p className="text-xl text-[#515153] leading-relaxed px-6 md:px-0">
          Connecting student builders <br className="md:hidden" />with world-class companies.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        <p className="font-bold text-2xl text-[#FEF8E8] ">
          Join the cohort.
        </p>

        {/* Input/Button Group */}
        <WaitlistForm />
      </div>
    </div>
  </main>
  )
}
