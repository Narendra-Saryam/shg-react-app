import { Languages, IndianRupee } from "lucide-react";
import { BottomNav } from "./components/BottomNav";
import { StatCard } from "./components/StatCard";
import { LoansSection } from "./components/sections/LoansSection";
import { MembersSection } from "./components/sections/MembersSection";
import { MeetingsSection } from "./components/sections/MeetingsSection";
import { SavingsSection } from "./components/sections/SavingsSection";
import { Button } from "./components/ui";
import { tabs, translations } from "./data/shgContent";
import { useShgTracker } from "./hooks/useShgTracker";

export default function App() {
  const tracker = useShgTracker();
  const { state, summary, setLanguage, setTab } = tracker;
  const t = translations[state.lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 pb-24 font-sans text-stone-900">
      <header className="relative overflow-hidden rounded-b-3xl bg-amber-700 px-5 pb-8 pt-6 text-white shadow-md">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-600/40" />
        <div className="absolute -right-2 top-10 h-16 w-16 rounded-full bg-orange-400/30" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold leading-tight">{t.title}</h1>
            <p className="mt-0.5 text-sm text-amber-100">{t.subtitle}</p>
          </div>

          <Button
            onClick={() => setLanguage(state.lang === "en" ? "mr" : "en")}
            className="rounded-full border border-white/15 bg-white/15 p-2 text-white hover:bg-white/25"
          >
            <Languages size={18} />
          </Button>
        </div>

        <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
          <StatCard label={t.groupSavings} value={summary.groupTotalSavings} />
          <StatCard label={t.activeLoans} value={summary.activeLoanTotal} />
        </div>
      </header>

      <main className="relative z-20 -mt-3 px-4">
        <section className="space-y-4">
          {state.tab === "members" && <MembersSection t={t} {...tracker} members={state.members} />}
          {state.tab === "savings" && (
            <SavingsSection t={t} {...tracker} members={state.members} savings={state.savings} />
          )}
          {state.tab === "loans" && (
            <LoansSection t={t} {...tracker} members={state.members} loans={state.loans} />
          )}
          {state.tab === "meetings" && (
            <MeetingsSection t={t} {...tracker} members={state.members} meetings={state.meetings} />
          )}
        </section>
      </main>

      <BottomNav tabs={tabs} currentTab={state.tab} labelMap={t} onTabChange={setTab} />
    </div>
  );
}
