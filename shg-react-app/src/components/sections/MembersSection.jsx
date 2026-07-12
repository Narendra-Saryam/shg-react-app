import { Plus, Trash2 } from "lucide-react";
import { Button, Card, Input } from "../ui";

export function MembersSection({
  t,
  members,
  newMember,
  setNewMember,
  addMember,
  removeItem,
  totalSavingsFor,
}) {
  return (
    <>
      <Card>
        <h2 className="mb-3 font-bold text-amber-900">{t.addMember}</h2>
        <div className="space-y-2">
          <Input
            placeholder={t.name}
            value={newMember.name}
            onChange={(event) => setNewMember({ ...newMember, name: event.target.value })}
          />
          <Input
            placeholder={t.phone}
            value={newMember.phone}
            onChange={(event) => setNewMember({ ...newMember, phone: event.target.value })}
          />
          <Input
            type="date"
            value={newMember.joined}
            onChange={(event) => setNewMember({ ...newMember, joined: event.target.value })}
          />
          <Button onClick={addMember}>
            <Plus size={16} />
            {t.addMember}
          </Button>
        </div>
      </Card>

      {members.length === 0 && <p className="py-6 text-center text-sm text-amber-700">{t.noData}</p>}

      <div className="space-y-3">
        {members.map((member) => (
          <Card key={member.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-900">{member.name}</p>
              <p className="text-xs text-amber-700/70">
                {member.phone} • {t.joined}: {member.joined || "—"}
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                {t.totalSaved}: ₹{totalSavingsFor(member.id).toLocaleString("en-IN")}
              </p>
            </div>
            <Button variant="danger" onClick={() => removeItem("members", member.id)}>
              <Trash2 size={16} />
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
