import { Plus, Trash2 } from "lucide-react";
import { Button, Card, Input, Select } from "../ui";
import { RepayRow } from "../RepayRow";

export function LoansSection({
  t,
  members,
  loans,
  newLoan,
  setNewLoan,
  addLoan,
  removeItem,
  memberName,
  recordRepayment,
}) {
  return (
    <>
      <Card>
        <h2 className="mb-3 font-bold text-amber-900">{t.giveLoan}</h2>
        <div className="space-y-2">
          <Select
            value={newLoan.memberId}
            onChange={(event) => setNewLoan({ ...newLoan, memberId: event.target.value })}
          >
            <option value="">{t.selectMember}</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </Select>
          <Input
            type="number"
            placeholder={t.loanAmount}
            value={newLoan.amount}
            onChange={(event) => setNewLoan({ ...newLoan, amount: event.target.value })}
          />
          <Input
            type="number"
            placeholder={t.interest}
            value={newLoan.interest}
            onChange={(event) => setNewLoan({ ...newLoan, interest: event.target.value })}
          />
          <Input
            type="date"
            value={newLoan.date}
            onChange={(event) => setNewLoan({ ...newLoan, date: event.target.value })}
          />
          <Button onClick={addLoan}>
            <Plus size={16} />
            {t.giveLoan}
          </Button>
        </div>
      </Card>

      {loans.length === 0 && <p className="py-6 text-center text-sm text-amber-700">{t.noData}</p>}

      <div className="space-y-3">
        {loans
          .slice()
          .reverse()
          .map((loan) => {
            const outstanding = Number(loan.amount) - Number(loan.repaid);

            return (
              <Card key={loan.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-amber-900">{memberName(loan.memberId)}</p>
                    <p className="text-xs text-amber-700/70">
                      {loan.date || "—"} • {t.interest}: {loan.interest}%
                    </p>
                  </div>
                  <Button variant="danger" onClick={() => removeItem("loans", loan.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-amber-800">
                    {t.loanAmount}: ₹{Number(loan.amount).toLocaleString("en-IN")}
                  </span>
                  <span className={`font-bold ${outstanding > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                    {outstanding > 0 ? `${t.outstanding}: ₹${outstanding.toLocaleString("en-IN")}` : t.paid}
                  </span>
                </div>
                {outstanding > 0 && <RepayRow t={t} onRepay={(amt) => recordRepayment(loan.id, amt)} />}
              </Card>
            );
          })}
      </div>
    </>
  );
}
