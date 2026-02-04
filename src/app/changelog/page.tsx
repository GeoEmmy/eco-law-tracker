export default function ChangelogPage() {
  const changes = [
    {
      date: "2026-02-03",
      title: "건축물의 에너지절약설계기준 개정",
      description: "에너지소요량평가 기준 수정, 1천㎡ 이상 건축물 EPI 의무사항 추가",
      lawId: "building-energy-saving-standard",
      type: "update",
    },
    {
      date: "2025-12-19",
      title: "인천광역시 녹색건축물 설계기준",
      description: "건축물에너지효율등급 관련 규정 삭제, 녹색건축인증 등급하향",
      lawId: "incheon-green-building",
      type: "update",
    },
    {
      date: "2025-01-01",
      title: "녹색건축물 조성 지원법 시행",
      description: "건축물에너지효율등급 폐지, 제로에너지 4등급 대상 추가",
      lawId: "green-building-support-act",
      type: "major",
    },
    {
      date: "2024-06-13",
      title: "분산에너지 활성화 특별법 신규",
      description: "분산에너지 설비 의무설치 비율 충족 및 전력계통영향평가 신설",
      lawId: "distributed-energy-act",
      type: "new",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">변경 이력</h1>
        <p className="mt-1 text-gray-600">
          법령 개정 및 업데이트 히스토리
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">최근 변경사항</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              최신법규 로드
            </button>
          </div>
        </div>
        <div className="divide-y">
          {changes.map((change, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                    ${change.type === "new" ? "bg-green-100 text-green-700" : ""}
                    ${change.type === "update" ? "bg-blue-100 text-blue-700" : ""}
                    ${change.type === "major" ? "bg-red-100 text-red-700" : ""}
                  `}
                  >
                    {change.type === "new" && "N"}
                    {change.type === "update" && "U"}
                    {change.type === "major" && "!"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {change.title}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded
                      ${change.type === "new" ? "bg-green-100 text-green-700" : ""}
                      ${change.type === "update" ? "bg-blue-100 text-blue-700" : ""}
                      ${change.type === "major" ? "bg-red-100 text-red-700" : ""}
                    `}
                    >
                      {change.type === "new" && "신규"}
                      {change.type === "update" && "개정"}
                      {change.type === "major" && "주요개정"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {change.description}
                  </p>
                </div>
                <div className="text-sm text-gray-500 flex-shrink-0">
                  {change.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              법제처 API 연동 예정
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              자동 동기화 기능이 곧 추가될 예정입니다. 현재는 수동으로 업데이트된 내용을 표시합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
