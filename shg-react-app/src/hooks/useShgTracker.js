import { useEffect, useMemo, useState } from "react";
import {
  initialLoans,
  initialMembers,
  initialMeetings,
  initialSavings,
} from "../data/shgContent";

const STORAGE_KEY = "shg-tracker-state";

const createInitialState = () => {
  if (typeof window === "undefined") {
    return {
      lang: "en",
      tab: "members",
      members: initialMembers,
      savings: initialSavings,
      loans: initialLoans,
      meetings: initialMeetings,
    };
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        lang: "en",
        tab: "members",
        members: initialMembers,
        savings: initialSavings,
        loans: initialLoans,
        meetings: initialMeetings,
      };
    }

    const parsed = JSON.parse(stored);
    return {
      lang: parsed.lang || "en",
      tab: parsed.tab || "members",
      members: parsed.members?.length ? parsed.members : initialMembers,
      savings: parsed.savings?.length ? parsed.savings : initialSavings,
      loans: parsed.loans?.length ? parsed.loans : initialLoans,
      meetings: parsed.meetings?.length ? parsed.meetings : initialMeetings,
    };
  } catch {
    return {
      lang: "en",
      tab: "members",
      members: initialMembers,
      savings: initialSavings,
      loans: initialLoans,
      meetings: initialMeetings,
    };
  }
};

export function useShgTracker() {
  const [state, setState] = useState(createInitialState);
  const [newMember, setNewMember] = useState({ name: "", phone: "", joined: "" });
  const [newSaving, setNewSaving] = useState({ memberId: "", amount: "", date: "" });
  const [newLoan, setNewLoan] = useState({ memberId: "", amount: "", date: "", interest: "" });
  const [newMeeting, setNewMeeting] = useState({ date: "", present: [] });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const memberName = (id) => state.members.find((member) => member.id === id)?.name || "—";

  const totalSavingsFor = (id) =>
    state.savings
      .filter((saving) => saving.memberId === id)
      .reduce((total, saving) => total + Number(saving.amount), 0);

  const summary = useMemo(() => {
    const groupTotalSavings = state.savings.reduce((total, saving) => total + Number(saving.amount), 0);
    const activeLoanTotal = state.loans.reduce(
      (total, loan) => total + (Number(loan.amount) - Number(loan.repaid)),
      0
    );

    return {
      groupTotalSavings,
      activeLoanTotal,
    };
  }, [state.loans, state.savings]);

  const addMember = () => {
    if (!newMember.name) return;

    setState((current) => ({
      ...current,
      members: [...current.members, { id: Date.now(), ...newMember }],
    }));
    setNewMember({ name: "", phone: "", joined: "" });
  };

  const addSaving = () => {
    if (!newSaving.memberId || !newSaving.amount) return;

    setState((current) => ({
      ...current,
      savings: [
        ...current.savings,
        {
          id: Date.now(),
          memberId: Number(newSaving.memberId),
          amount: Number(newSaving.amount),
          date: newSaving.date,
        },
      ],
    }));
    setNewSaving({ memberId: "", amount: "", date: "" });
  };

  const addLoan = () => {
    if (!newLoan.memberId || !newLoan.amount) return;

    setState((current) => ({
      ...current,
      loans: [
        ...current.loans,
        {
          id: Date.now(),
          memberId: Number(newLoan.memberId),
          amount: Number(newLoan.amount),
          date: newLoan.date,
          interest: Number(newLoan.interest || 0),
          repaid: 0,
        },
      ],
    }));
    setNewLoan({ memberId: "", amount: "", date: "", interest: "" });
  };

  const recordRepayment = (loanId, amt) => {
    if (!amt) return;

    setState((current) => ({
      ...current,
      loans: current.loans.map((loan) =>
        loan.id === loanId
          ? { ...loan, repaid: Math.min(Number(loan.amount), loan.repaid + Number(amt)) }
          : loan
      ),
    }));
  };

  const addMeeting = () => {
    if (!newMeeting.date) return;

    setState((current) => ({
      ...current,
      meetings: [
        ...current.meetings,
        { id: Date.now(), date: newMeeting.date, present: newMeeting.present },
      ],
    }));
    setNewMeeting({ date: "", present: [] });
  };

  const toggleAttendance = (memberId) => {
    setNewMeeting((current) => ({
      ...current,
      present: current.present.includes(memberId)
        ? current.present.filter((id) => id !== memberId)
        : [...current.present, memberId],
    }));
  };

  const removeItem = (collection, id) => {
    setState((current) => ({
      ...current,
      [collection]: current[collection].filter((item) => item.id !== id),
    }));
  };

  return {
    state,
    setState,
    setLanguage: (lang) => setState((current) => ({ ...current, lang })),
    setTab: (tab) => setState((current) => ({ ...current, tab })),
    newMember,
    setNewMember,
    newSaving,
    setNewSaving,
    newLoan,
    setNewLoan,
    newMeeting,
    setNewMeeting,
    memberName,
    totalSavingsFor,
    summary,
    addMember,
    addSaving,
    addLoan,
    recordRepayment,
    addMeeting,
    toggleAttendance,
    removeItem,
  };
}
