"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WaitlistForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Construct mailto link
    const subject = encodeURIComponent("Join Waitlist Request");
    const body = encodeURIComponent(`Please add the following email to the waitlist: ${email}`);
    window.location.href = `mailto:waitlist@shipyard-labs.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 w-full max-w-md">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-[#1c1c1c] border border-[#333] rounded px-4 py-3 text-[#FEF8E8] focus:outline-none focus:border-[#F44A22] transition-colors"
        required
      />
      <Button 
        type="submit" 
        className="bg-[#F44A22] text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors cursor-pointer"
      >
        Join Waitlist
      </Button>
    </form>
  );
}
