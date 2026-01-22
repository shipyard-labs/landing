"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner"
import { Loader2Icon, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadType, setLeadType] = useState<"STUDENT" | "SPONSOR" | null>(null);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !leadType) return;

    setIsLoading(true);

    const { error, status } = await supabase
      .from('waitlist')
      .insert({ email: email, lead_type: leadType })
    // Don't use .select() - no need to read back the data

    if (status === 201) {
      toast.success("Email added to waitlist successfully");
      setEmail(""); // Clear the email field
      setLeadType(null); // Reset selection
      setIsLoading(false);
    } else if (status === 409 && error?.message.includes('unique_email')) {
      toast.error("Email already exists in waitlist");
      setIsLoading(false);
    } else {
      toast.error("Error adding email to waitlist: " + error?.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-4 px-6 md:px-0">
      <AnimatePresence mode="wait">
        {!leadType ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-3 w-full"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setLeadType("STUDENT")}
              className="flex-1 h-12 text-base transition-all duration-300 hover:bg-secondary/80 hover:border-white/20"
            >
              I'm a Student
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLeadType("SPONSOR")}
              className="flex-1 h-12 text-base transition-all duration-300 hover:bg-secondary/80 hover:border-white/20"
            >
              I'm a Sponsor
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
           
            <form
              onSubmit={handleSubmit as React.FormEventHandler<HTMLFormElement>}
              className="flex flex-col md:flex-row gap-2 w-full"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#1c1c1c] border border-[#333] rounded px-4 py-3 text-[#FEF8E8] focus:outline-none focus:border-[#F44A22] transition-colors"
                required
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-[#F44A22] text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Join Waitlist"}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
