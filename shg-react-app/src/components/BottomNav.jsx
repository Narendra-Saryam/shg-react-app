export function BottomNav({ tabs, currentTab, labelMap, onTabChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-amber-100 bg-white px-3 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2">
        {tabs.map(({ key, icon: Icon }) => {
          const active = currentTab === key;

          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-1 text-xs font-medium transition-colors ${
                active ? "text-amber-700" : "text-amber-400"
              }`}
            >
              <Icon size={20} fill={active ? "currentColor" : "none"} strokeWidth={active ? 1.5 : 2} />
              {labelMap[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
