import { Plus, Trash2 } from "lucide-react";
import { Button, Card, Input } from "../ui";

export function MeetingsSection({
  t,
  members,
  meetings,
  newMeeting,
  setNewMeeting,
  addMeeting,
  toggleAttendance,
  removeItem,
}) {
  return (
    <>
      <Card>
        <h2 className="mb-3 font-bold text-amber-900">{t.addMeeting}</h2>
        <div className="space-y-2">
          <Input
            type="date"
            value={newMeeting.date}
            onChange={(event) => setNewMeeting({ ...newMeeting, date: event.target.value })}
          />
          <p className="mt-1 text-xs font-semibold text-amber-800">{t.attendance}</p>
          <div className="space-y-1.5">
            {members.map((member) => (
              <label
                key={member.id}
                className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={newMeeting.present.includes(member.id)}
                  onChange={() => toggleAttendance(member.id)}
                  className="accent-amber-600"
                />
                {member.name}
              </label>
            ))}
          </div>
          <Button onClick={addMeeting}>
            <Plus size={16} />
            {t.addMeeting}
          </Button>
        </div>
      </Card>

      {meetings.length === 0 && <p className="py-6 text-center text-sm text-amber-700">{t.noData}</p>}

      <div className="space-y-3">
        {meetings
          .slice()
          .reverse()
          .map((meeting) => (
            <Card key={meeting.id}>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-amber-900">{meeting.date}</p>
                <Button variant="danger" onClick={() => removeItem("meetings", meeting.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map((member) => {
                  const isPresent = meeting.present.includes(member.id);

                  return (
                    <span
                      key={member.id}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        isPresent ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {member.name}: {isPresent ? t.present : t.absent}
                    </span>
                  );
                })}
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}
