"use client";

import { ClockRegister } from "@/components/Clock/ClockRegister";
import { ClockList } from "@/components/Clock/ClockList";
import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {
  const { token } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg p-10 rounded-lg">
      <h1 className="text-2xl text-text mb-6">Ponto Eletrônico</h1>
      <ClockRegister/>
      <ClockList/>
    </div>
  );
}
