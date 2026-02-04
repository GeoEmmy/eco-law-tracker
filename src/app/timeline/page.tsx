"use client";

import { useState, useEffect } from "react";
import { LawData, Law } from "@/types/law";

export default function TimelinePage() {
  const [data, setData] = useState<LawData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const basePath = process.env.NODE_ENV === "production" ? "/eco-law-tracker" : "";
    fetch(`${basePath}/data/laws-to-track.json`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  const selectedDateObj = new Date(selectedDate);

  const effectiveLaws = data.nationalLaws.filter((law) => {
    const effectiveDate = new Date(law.effectiveDate);
    return effectiveDate <= selectedDateObj;
  });

  const upcomingLaws = data.nationalLaws.filter((law) => {
    const effectiveDate = new Date(law.effectiveDate);
    return effectiveDate > selectedDateObj;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">시점 기반 조회</h1>
        <p className="mt-1 text-gray-600">
          특정 날짜 기준으로 유효한 법령을 확인합니다
        </p>
      </div>

      {/* Date Selector */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          조회 기준일
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDate("2024-01-01")}
              className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              2024.1.1
            </button>
            <button
              onClick={() => setSelectedDate("2025-01-01")}
              className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              2025.1.1
            </button>
            <button
              onClick={() =>
                setSelectedDate(new Date().toISOString().split("T")[0])
              }
              className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              오늘
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          선택한 날짜: {selectedDate} (
          {selectedDateObj.toLocaleDateString("ko-KR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          )
        </p>
      </div>

      {/* Effective Laws */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b bg-green-50">
          <h2 className="text-lg font-semibold text-gray-900">
            유효 법령 ({effectiveLaws.length})
          </h2>
          <p className="text-sm text-gray-600">
            {selectedDate} 기준 시행 중인 법령
          </p>
        </div>
        <div className="divide-y max-h-96 overflow-y-auto">
          {effectiveLaws
            .sort(
              (a, b) =>
                new Date(b.effectiveDate).getTime() -
                new Date(a.effectiveDate).getTime()
            )
            .map((law) => (
              <div key={law.id} className="px-6 py-3 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900">{law.name}</span>
                    <span
                      className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${law.category === "법률" ? "bg-red-100 text-red-800" : ""}
                      ${law.category === "고시" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${law.category === "규칙" ? "bg-blue-100 text-blue-800" : ""}
                    `}
                    >
                      {law.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{law.effectiveDate}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Upcoming Laws */}
      {upcomingLaws.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b bg-yellow-50">
            <h2 className="text-lg font-semibold text-gray-900">
              시행 예정 ({upcomingLaws.length})
            </h2>
            <p className="text-sm text-gray-600">
              {selectedDate} 이후 시행 예정인 법령
            </p>
          </div>
          <div className="divide-y">
            {upcomingLaws
              .sort(
                (a, b) =>
                  new Date(a.effectiveDate).getTime() -
                  new Date(b.effectiveDate).getTime()
              )
              .map((law) => (
                <div key={law.id} className="px-6 py-3 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-900">
                        {law.name}
                      </span>
                      <span
                        className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        ${law.category === "법률" ? "bg-red-100 text-red-800" : ""}
                        ${law.category === "고시" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${law.category === "규칙" ? "bg-blue-100 text-blue-800" : ""}
                      `}
                      >
                        {law.category}
                      </span>
                    </div>
                    <div className="text-sm text-orange-600 font-medium">
                      {law.effectiveDate} 시행
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
