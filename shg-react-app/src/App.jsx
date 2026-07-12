import { useState } from "react";
import {
  Users,
  Wallet,
  HandCoins,
  CalendarCheck,
  Plus,
  Trash2,
  Languages,
  IndianRupee,
} from "lucide-react";

const T = {
  en: {
    title: "Shitala Mata Self Help Group",
    subtitle: "Member & Finance Tracker",
    members: "Members",
    savings: "Savings",
    loans: "Loans",
    meetings: "Meetings",
    addMember: "Add Member",
    name: "Name",
    phone: "Phone",
    joined: "Joined",
    totalSaved: "Total Saved",
    addSaving: "Add Monthly Saving",
    amount: "Amount (₹)",
    date: "Date",
    loanFor: "Member",
    loanAmount: "Loan Amount (₹)",
    loanDate: "Date Given",
    interest: "Interest %",
    status: "Status",
    outstanding: "Outstanding",
    paid: "Paid",
    giveLoan: "Give Loan",
    repay: "Record Repayment",
    repayAmt: "Repayment (₹)",
    meetingDate: "Meeting Date",
    attendance: "Attendance",
    present: "Present",
    absent: "Absent",
    addMeeting: "Add Meeting",
    noData: "No records yet.",
    delete: "Delete",
    groupSavings: "Total Group Savings",
    activeLoans: "Active Loan Amount",
    selectMember: "Select member",
    record: "Record",
    balance: "Balance",
  },
  mr: {
    title: "शितला माता बचत गट",
    subtitle: "सदस्य व आर्थिक नोंदी",
    members: "सदस्य",
    savings: "बचत",
    loans: "कर्ज",
    meetings: "सभा",
    addMember: "सदस्य जोडा",
    name: "नाव",
    phone: "मोबाईल नं.",
    joined: "सामील झाल्याची तारीख",
    totalSaved: "एकूण बचत",
    addSaving: "मासिक बचत नोंदवा",
    amount: "रक्कम (₹)",
    date: "तारीख",
    loanFor: "सदस्य",
    loanAmount: "कर्ज रक्कम (₹)",
    loanDate: "दिल्याची तारीख",
    interest: "व्याज %",
    status: "स्थिती",
    outstanding: "थकीत",
    paid: "फेड झाले",
    giveLoan: "कर्ज द्या",
    repay: "परतफेड नोंदवा",
    repayAmt: "परतफेड रक्कम (₹)",
    meetingDate: "सभेची तारीख",
    attendance: "उपस्थिती",
    present: "उपस्थित",
    absent: "अनुपस्थित",
    addMeeting: "सभा नोंदवा",
    noData: "अद्याप नोंद नाही.",
    delete: "काढा",
    groupSavings: "एकूण गट बचत",
    activeLoans: "थकीत कर्ज रक्कम",
    selectMember: "सदस्य निवडा",
    record: "नोंद करा",
    balance: "शिल्लक",
  },
};

const TABS = [
  { key: "members", icon: Users },
  { key: "savings", icon: Wallet },
  { key: "loans", icon: HandCoins },
  { key: "meetings", icon: CalendarCheck },
];

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-amber-100 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full border border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50/50"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="w-full border border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50/50"
    />
  );
}

function Btn({ children, onClick, variant = "primary", className = "" }) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5";
  const styles = {
    primary: "bg-amber-600 text-white hover:bg-amber-700",
    ghost: "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200",
    danger: "text-rose-500 hover:bg-rose-50",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const [tab, setTab] = useState("members");

  const [members, setMembers] = useState([
    { id: 1, name: "Sunita Patil", phone: "9876543210", joined: "2024-01-15" },
    { id: 2, name: "Anjali More", phone: "9823456710", joined: "2024-01-15" },
  ]);
  const [savings, setSavings] = useState([
    { id: 1, memberId: 1, amount: 500, date: "2025-01-05" },
    { id: 2, memberId: 2, amount: 500, date: "2025-01-05" },
  ]);
  const [loans, setLoans] = useState([
    { id: 1, memberId: 1, amount: 5000, date: "2025-02-01", interest: 2, repaid: 1000 },
  ]);
  const [meetings, setMeetings] = useState([
    { id: 1, date: "2025-01-05", present: [1, 2] },
  ]);

  // form states
  const [newMember, setNewMember] = useState({ name: "", phone: "", joined: "" });
  const [newSaving, setNewSaving] = useState({ memberId: "", amount: "", date: "" });
  const [newLoan, setNewLoan] = useState({ memberId: "", amount: "", date: "", interest: "" });
  const [newMeeting, setNewMeeting] = useState({ date: "", present: [] });

  const memberName = (id) => members.find((m) => m.id === id)?.name || "—";
  const totalSavingsFor = (id) =>
    savings.filter((s) => s.memberId === id).reduce((a, s) => a + Number(s.amount), 0);
  const groupTotalSavings = savings.reduce((a, s) => a + Number(s.amount), 0);
  const activeLoanTotal = loans.reduce(
    (a, l) => a + (Number(l.amount) - Number(l.repaid)),
    0
  );

  const addMember = () => {
    if (!newMember.name) return;
    setMembers([...members, { id: Date.now(), ...newMember }]);
    setNewMember({ name: "", phone: "", joined: "" });
  };

  const addSaving = () => {
    if (!newSaving.memberId || !newSaving.amount) return;
    setSavings([
      ...savings,
      {
        id: Date.now(),
        memberId: Number(newSaving.memberId),
        amount: Number(newSaving.amount),
        date: newSaving.date,
      },
    ]);
    setNewSaving({ memberId: "", amount: "", date: "" });
  };

  const addLoan = () => {
    if (!newLoan.memberId || !newLoan.amount) return;
    setLoans([
      ...loans,
      {
        id: Date.now(),
        memberId: Number(newLoan.memberId),
        amount: Number(newLoan.amount),
        date: newLoan.date,
        interest: Number(newLoan.interest || 0),
        repaid: 0,
      },
    ]);
    setNewLoan({ memberId: "", amount: "", date: "", interest: "" });
  };

  const recordRepayment = (loanId, amt) => {
    if (!amt) return;
    setLoans(
      loans.map((l) =>
        l.id === loanId
          ? { ...l, repaid: Math.min(Number(l.amount), l.repaid + Number(amt)) }
          : l
      )
    );
  };

  const addMeeting = () => {
    if (!newMeeting.date) return;
    setMeetings([
      ...meetings,
      { id: Date.now(), date: newMeeting.date, present: newMeeting.present },
    ]);
    setNewMeeting({ date: "", present: [] });
  };

  const toggleAttendance = (memberId) => {
    setNewMeeting((nm) => ({
      ...nm,
      present: nm.present.includes(memberId)
        ? nm.present.filter((id) => id !== memberId)
        : [...nm.present, memberId],
    }));
  };

  const remove = (setter, list, id) => setter(list.filter((x) => x.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-amber-700 text-white px-5 pt-6 pb-8 rounded-b-3xl shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-amber-600/40" />
        <div className="absolute -right-2 top-10 w-16 h-16 rounded-full bg-orange-400/30" />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold leading-tight">{t.title}</h1>
            <p className="text-amber-100 text-sm mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="bg-white/15 hover:bg-white/25 rounded-full p-2 transition-colors"
            aria-label="Toggle language"
          >
            <Languages size={18} />
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 mt-5">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-xs text-amber-100">{t.groupSavings}</p>
            <p className="text-lg font-bold flex items-center gap-0.5">
              <IndianRupee size={15} />
              {groupTotalSavings.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-xs text-amber-100">{t.activeLoans}</p>
            <p className="text-lg font-bold flex items-center gap-0.5">
              <IndianRupee size={15} />
              {activeLoanTotal.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 relative z-20 space-y-4">
        {/* MEMBERS */}
        {tab === "members" && (
          <>
            <Card>
              <h2 className="font-bold text-amber-900 mb-3">{t.addMember}</h2>
              <div className="space-y-2">
                <Input
                  placeholder={t.name}
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <Input
                  placeholder={t.phone}
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
                <Input
                  type="date"
                  value={newMember.joined}
                  onChange={(e) => setNewMember({ ...newMember, joined: e.target.value })}
                />
                <Btn onClick={addMember}>
                  <Plus size={16} />
                  {t.addMember}
                </Btn>
              </div>
            </Card>

            {members.length === 0 && (
              <p className="text-center text-amber-700 text-sm py-6">{t.noData}</p>
            )}

            {members.map((m) => (
              <Card key={m.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-amber-900">{m.name}</p>
                  <p className="text-xs text-amber-700/70">
                    {m.phone} • {t.joined}: {m.joined || "—"}
                  </p>
                  <p className="text-xs text-amber-700 mt-1 font-medium">
                    {t.totalSaved}: ₹{totalSavingsFor(m.id).toLocaleString("en-IN")}
                  </p>
                </div>
                <Btn variant="danger" onClick={() => remove(setMembers, members, m.id)}>
                  <Trash2 size={16} />
                </Btn>
              </Card>
            ))}
          </>
        )}

        {/* SAVINGS */}
        {tab === "savings" && (
          <>
            <Card>
              <h2 className="font-bold text-amber-900 mb-3">{t.addSaving}</h2>
              <div className="space-y-2">
                <Select
                  value={newSaving.memberId}
                  onChange={(e) => setNewSaving({ ...newSaving, memberId: e.target.value })}
                >
                  <option value="">{t.selectMember}</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="number"
                  placeholder={t.amount}
                  value={newSaving.amount}
                  onChange={(e) => setNewSaving({ ...newSaving, amount: e.target.value })}
                />
                <Input
                  type="date"
                  value={newSaving.date}
                  onChange={(e) => setNewSaving({ ...newSaving, date: e.target.value })}
                />
                <Btn onClick={addSaving}>
                  <Plus size={16} />
                  {t.record}
                </Btn>
              </div>
            </Card>

            {savings.length === 0 && (
              <p className="text-center text-amber-700 text-sm py-6">{t.noData}</p>
            )}

            {savings
              .slice()
              .reverse()
              .map((s) => (
                <Card key={s.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-amber-900">{memberName(s.memberId)}</p>
                    <p className="text-xs text-amber-700/70">{s.date || "—"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-emerald-600">
                      +₹{Number(s.amount).toLocaleString("en-IN")}
                    </p>
                    <Btn variant="danger" onClick={() => remove(setSavings, savings, s.id)}>
                      <Trash2 size={14} />
                    </Btn>
                  </div>
                </Card>
              ))}
          </>
        )}

        {/* LOANS */}
        {tab === "loans" && (
          <>
            <Card>
              <h2 className="font-bold text-amber-900 mb-3">{t.giveLoan}</h2>
              <div className="space-y-2">
                <Select
                  value={newLoan.memberId}
                  onChange={(e) => setNewLoan({ ...newLoan, memberId: e.target.value })}
                >
                  <option value="">{t.selectMember}</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="number"
                  placeholder={t.loanAmount}
                  value={newLoan.amount}
                  onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder={t.interest}
                  value={newLoan.interest}
                  onChange={(e) => setNewLoan({ ...newLoan, interest: e.target.value })}
                />
                <Input
                  type="date"
                  value={newLoan.date}
                  onChange={(e) => setNewLoan({ ...newLoan, date: e.target.value })}
                />
                <Btn onClick={addLoan}>
                  <Plus size={16} />
                  {t.giveLoan}
                </Btn>
              </div>
            </Card>

            {loans.length === 0 && (
              <p className="text-center text-amber-700 text-sm py-6">{t.noData}</p>
            )}

            {loans
              .slice()
              .reverse()
              .map((l) => {
                const outstanding = Number(l.amount) - Number(l.repaid);
                return (
                  <Card key={l.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-amber-900">{memberName(l.memberId)}</p>
                        <p className="text-xs text-amber-700/70">
                          {l.date || "—"} • {t.interest}: {l.interest}%
                        </p>
                      </div>
                      <Btn variant="danger" onClick={() => remove(setLoans, loans, l.id)}>
                        <Trash2 size={14} />
                      </Btn>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-amber-800">
                        {t.loanAmount}: ₹{Number(l.amount).toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`font-bold ${
                          outstanding > 0 ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {outstanding > 0
                          ? `${t.outstanding}: ₹${outstanding.toLocaleString("en-IN")}`
                          : t.paid}
                      </span>
                    </div>
                    {outstanding > 0 && (
                      <RepayRow t={t} onRepay={(amt) => recordRepayment(l.id, amt)} />
                    )}
                  </Card>
                );
              })}
          </>
        )}

        {/* MEETINGS */}
        {tab === "meetings" && (
          <>
            <Card>
              <h2 className="font-bold text-amber-900 mb-3">{t.addMeeting}</h2>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                />
                <p className="text-xs font-semibold text-amber-800 mt-1">{t.attendance}</p>
                <div className="space-y-1.5">
                  {members.map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-2 text-sm bg-amber-50 rounded-lg px-3 py-2 border border-amber-100"
                    >
                      <input
                        type="checkbox"
                        checked={newMeeting.present.includes(m.id)}
                        onChange={() => toggleAttendance(m.id)}
                        className="accent-amber-600"
                      />
                      {m.name}
                    </label>
                  ))}
                </div>
                <Btn onClick={addMeeting}>
                  <Plus size={16} />
                  {t.addMeeting}
                </Btn>
              </div>
            </Card>

            {meetings.length === 0 && (
              <p className="text-center text-amber-700 text-sm py-6">{t.noData}</p>
            )}

            {meetings
              .slice()
              .reverse()
              .map((mt) => (
                <Card key={mt.id}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-amber-900">{mt.date}</p>
                    <Btn variant="danger" onClick={() => remove(setMeetings, meetings, mt.id)}>
                      <Trash2 size={14} />
                    </Btn>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {members.map((m) => (
                      <span
                        key={m.id}
                        className={`text-xs px-2 py-1 rounded-full ${
                          mt.present.includes(m.id)
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {m.name}: {mt.present.includes(m.id) ? t.present : t.absent}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-100 flex justify-around py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {TABS.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl text-xs font-medium transition-colors ${
              tab === key ? "text-amber-700" : "text-amber-400"
            }`}
          >
            <Icon size={20} fill={tab === key ? "currentColor" : "none"} strokeWidth={tab === key ? 1.5 : 2} />
            {t[key]}
          </button>
        ))}
      </div>
    </div>
  );
}

function RepayRow({ t, onRepay }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder={t.repayAmt}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <Btn
        variant="ghost"
        onClick={() => {
          onRepay(val);
          setVal("");
        }}
      >
        {t.repay}
      </Btn>
    </div>
  );
}
