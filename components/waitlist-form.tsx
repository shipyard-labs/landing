"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function WaitlistForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const { error, status } = await supabase
      .from('waitlist')
      .insert({ email: email })
    // Don't use .select() - no need to read back the data

    if (status === 201) {
      console.log("Email added to waitlist successfully");
      setEmail(""); // Clear the email field
    } else if (error) {
      console.error("Error adding email to waitlist:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit as React.FormEventHandler<HTMLFormElement>} className="flex flex-col md:flex-row gap-2 w-full max-w-md">
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
