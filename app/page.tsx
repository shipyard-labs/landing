import { InfrastructureGrid } from "@/components/infrastructure-grid";

export default function Home() {
  return (<main className="relative min-h-screen flex flex-col items-center justify-center bg-[#161616] overflow-hidden">

    {/* Background Layer */}
    <InfrastructureGrid />

    {/* Content Layer (Ensure z-index is higher) */}
    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#FEF8E8] mb-6">
        SHPYRD
      </h1>
      <p className="text-xl text-[#A8AAAC] mb-8 max-w-lg">
        Connecting student builders with world-class companies.
      </p>

      <p className="font-bold text-2xl text-[#FEF8E8] mb-4 max-w-lg">
        Join the cohort.
      </p>

      {/* Input/Button Group would go here */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-[#1c1c1c] border border-[#333] rounded px-4 py-3 text-[#FEF8E8] focus:outline-none focus:border-[#F44A22] transition-colors"
        />
        <button className="bg-[#F44A22] text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors">
          Join Waitlist
        </button>
      </div>
    </div>
  </main>
  )
}
