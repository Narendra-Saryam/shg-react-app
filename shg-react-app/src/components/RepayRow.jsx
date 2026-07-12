import { useState } from "react";
import { Button, Input } from "./ui";

export function RepayRow({ t, onRepay }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder={t.repayAmt}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        variant="ghost"
        onClick={() => {
          onRepay(value);
          setValue("");
        }}
      >
        {t.repay}
      </Button>
    </div>
  );
}
