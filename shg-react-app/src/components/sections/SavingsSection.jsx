import { Plus, Trash2 } from "lucide-react";
import { Button, Card, Input, Select } from "../ui";

export function SavingsSection({ t, members, savings, newSaving, setNewSaving, addSaving, removeItem, memberName }) {
  return (
    <>
      <Card>
        <h2 className="mb-3 font-bold text-amber-900">{t.addSaving}</h2>
        <div className="space-y-2">
          <Select
            value={newSaving.memberId}
            onChange={(event) => setNewSaving({ ...newSaving, memberId: event.target.value })}
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
            placeholder={t.amount}
            value={newSaving.amount}
            onChange={(event) => setNewSaving({ ...newSaving, amount: event.target.value })}
          />
          <Input
            type="date"
            value={newSaving.date}
            onChange={(event) => setNewSaving({ ...newSaving, date: event.target.value })}
          />
          <Button onClick={addSaving}>
            <Plus size={16} />
            {t.record}
          </Button>
        </div>
      </Card>

      {savings.length === 0 && <p className="py-6 text-center text-sm text-amber-700">{t.noData}</p>}

      <div className="space-y-3">
        {savings
          .slice()
          .reverse()
          .map((saving) => (
            <Card key={saving.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-amber-900">{memberName(saving.memberId)}</p>
                <p className="text-xs text-amber-700/70">{saving.date || "—"}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-emerald-600">
                  +₹{Number(saving.amount).toLocaleString("en-IN")}
                </p>
                <Button variant="danger" onClick={() => removeItem("savings", saving.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}
