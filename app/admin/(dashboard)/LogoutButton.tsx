"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg border border-destructive text-destructive hover:bg-destructive/10 mt-3 w-full"
    >
      <LogOut size={16} /> Logout
    </button>
  );
}
