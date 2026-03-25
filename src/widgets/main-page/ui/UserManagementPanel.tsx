const users = [
  {
    id: 1,
    room: "511호",
    name: "김민솔",
    reason: "사유 예약 정지 2회 이상",
    remain: "00:32:12",
  },
  {
    id: 2,
    room: "511호",
    name: "김민솔",
    reason: "사유 예약 정지 2회 이상",
    remain: "00:32:12",
  },
  {
    id: 3,
    room: "511호",
    name: "김민솔",
    reason: "사유 예약 정지 2회 이상",
    remain: "00:32:12",
  },
  {
    id: 4,
    room: "511호",
    name: "김민솔",
    reason: "사유 예약 정지 2회 이상",
    remain: "00:32:12",
  },
];

export default function UserManagementPanel() {
  return (
    <section className="rounded-2xl bg-[#ececef] px-5 py-5">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-[17px] font-semibold text-[#4a4a4f]">
          사용자 관리
        </h2>
        <span className="text-[#a4a4aa]">◌</span>
      </div>

      <div className="flex flex-col gap-5">
        {users.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[15px] font-medium text-[#4a4a4f]">
                {item.room} {item.name}
              </p>
              <p className="mt-1 text-sm text-[#9a9aa0]">{item.reason}</p>
              <p className="mt-1 text-sm text-[#9a9aa0]">
                남은 시간: {item.remain}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="inline-flex h-7 items-center justify-center rounded-full bg-[#ef4b4f] px-3 text-xs font-semibold text-white">
                연장
              </button>
              <button className="inline-flex h-7 items-center justify-center rounded-full bg-[#4d83f6] px-3 text-xs font-semibold text-white">
                해제
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
