import * as XLSX from "xlsx";

const SHEETS = {
  members: "Members",
  savings: "Savings",
  loans: "Loans",
  meetings: "Meetings",
};

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeDate = (value) => (value ? String(value).slice(0, 10) : "");

const normalizeId = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parsePresentList = (value) => {
  if (Array.isArray(value)) {
    return value.map((entry) => toNumber(entry)).filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split(/[,;|]/)
    .map((entry) => toNumber(entry.trim()))
    .filter(Boolean);
};

const asRows = (sheetName, workbook) => {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
};

export function exportTrackerWorkbook(state) {
  const workbook = XLSX.utils.book_new();

  const membersRows = state.members.map((member) => ({
    id: member.id,
    name: member.name,
    phone: member.phone,
    joined: normalizeDate(member.joined),
  }));

  const savingsRows = state.savings.map((saving) => ({
    id: saving.id,
    memberId: saving.memberId,
    memberName: state.members.find((member) => member.id === saving.memberId)?.name || "",
    amount: toNumber(saving.amount),
    date: normalizeDate(saving.date),
  }));

  const loansRows = state.loans.map((loan) => ({
    id: loan.id,
    memberId: loan.memberId,
    memberName: state.members.find((member) => member.id === loan.memberId)?.name || "",
    amount: toNumber(loan.amount),
    date: normalizeDate(loan.date),
    interest: toNumber(loan.interest),
    repaid: toNumber(loan.repaid),
    outstanding: Math.max(0, toNumber(loan.amount) - toNumber(loan.repaid)),
  }));

  const meetingsRows = state.meetings.map((meeting) => ({
    id: meeting.id,
    date: normalizeDate(meeting.date),
    presentMemberIds: meeting.present.join(", "),
    presentMemberNames: meeting.present
      .map((memberId) => state.members.find((member) => member.id === memberId)?.name)
      .filter(Boolean)
      .join(", "),
    presentCount: meeting.present.length,
  }));

  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(membersRows), SHEETS.members);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(savingsRows), SHEETS.savings);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(loansRows), SHEETS.loans);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(meetingsRows), SHEETS.meetings);

  XLSX.writeFile(workbook, "shg-tracker.xlsx");
}

export async function importTrackerWorkbook(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const memberRows = asRows(SHEETS.members, workbook);
  const members = memberRows.map((row, index) => ({
    id: normalizeId(row.id, Date.now() + index),
    name: row.name || "",
    phone: row.phone || "",
    joined: normalizeDate(row.joined),
  }));

  const memberIdByName = new Map(members.map((member) => [member.name, member.id]));

  const savings = asRows(SHEETS.savings, workbook).map((row, index) => ({
    id: normalizeId(row.id, Date.now() + index),
    memberId: normalizeId(row.memberId, memberIdByName.get(row.memberName) || 0),
    amount: toNumber(row.amount),
    date: normalizeDate(row.date),
  }));

  const loans = asRows(SHEETS.loans, workbook).map((row, index) => ({
    id: normalizeId(row.id, Date.now() + index),
    memberId: normalizeId(row.memberId, memberIdByName.get(row.memberName) || 0),
    amount: toNumber(row.amount),
    date: normalizeDate(row.date),
    interest: toNumber(row.interest),
    repaid: toNumber(row.repaid),
  }));

  const meetings = asRows(SHEETS.meetings, workbook).map((row, index) => ({
    id: normalizeId(row.id, Date.now() + index),
    date: normalizeDate(row.date),
    present: parsePresentList(row.presentMemberIds),
  }));

  return {
    members,
    savings,
    loans,
    meetings,
  };
}