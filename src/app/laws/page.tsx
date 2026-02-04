"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LawData, Law, LocalOrdinance } from "@/types/law";

export default function LawsPage() {
  const [data, setData] = useState<LawData | null>(null);
  const [filter, setFilter] = useState<"all" | "national" | "local">("all");
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  useEffect(() => {
    fetch("/data/laws-to-track.json")
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

  const filteredNationalLaws = data.nationalLaws.filter((law) =>
    law.name.includes(search) || law.topics?.some((t) => t.includes(search))
  );

  const regions = Object.keys(data.localOrdinances);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">법령 목록</h1>
        <p className="mt-1 text-gray-600">
          친환경 건축 관련 국가 법령 및 지방 조례
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="법령명 또는 키워드 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("national")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "national"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              국가 법령
            </button>
            <button
              onClick={() => setFilter("local")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "local"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              지방 조례
            </button>
          </div>
        </div>

        {filter === "local" && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedRegion("all")}
              className={`px-3 py-1 rounded text-sm ${
                selectedRegion === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              전체 지역
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* National Laws */}
      {(filter === "all" || filter === "national") && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              국가 법령 ({filteredNationalLaws.length})
            </h2>
          </div>
          <div className="divide-y">
            {filteredNationalLaws.map((law) => (
              <LawRow key={law.id} law={law} />
            ))}
          </div>
        </div>
      )}

      {/* Local Ordinances */}
      {(filter === "all" || filter === "local") && (
        <div className="space-y-4">
          {(selectedRegion === "all" ? regions : [selectedRegion]).map(
            (region) => {
              const ordinances = data.localOrdinances[region]?.filter(
                (o) =>
                  o.name.includes(search) ||
                  o.topics?.some((t) => t.includes(search))
              );
              if (!ordinances?.length) return null;
              return (
                <div
                  key={region}
                  className="bg-white rounded-lg shadow-sm border"
                >
                  <div className="px-6 py-4 border-b bg-blue-50">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {region} ({ordinances.length})
                    </h2>
                  </div>
                  <div className="divide-y">
                    {ordinances.map((ord) => (
                      <OrdinanceRow key={ord.id} ordinance={ord} />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

function LawRow({ law }: { law: Law }) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
              ${law.category === "법률" ? "bg-red-100 text-red-800" : ""}
              ${law.category === "고시" ? "bg-yellow-100 text-yellow-800" : ""}
              ${law.category === "규칙" ? "bg-blue-100 text-blue-800" : ""}
              ${law.category === "시행령" ? "bg-purple-100 text-purple-800" : ""}
            `}
            >
              {law.category}
            </span>
            <Link
              href={`/laws/${law.id}`}
              className="font-medium text-gray-900 hover:text-green-600"
            >
              {law.name}
            </Link>
          </div>
          {law.lawNumber && (
            <div className="mt-1 text-sm text-gray-500">{law.lawNumber}</div>
          )}
          {law.topics && (
            <div className="mt-2 flex flex-wrap gap-1">
              {law.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="text-right ml-4">
          <div className="text-sm font-medium text-gray-900">
            {law.effectiveDate}
          </div>
          <div className="text-xs text-gray-500">시행일</div>
        </div>
      </div>
    </div>
  );
}

function OrdinanceRow({ ordinance }: { ordinance: LocalOrdinance }) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-medium text-gray-900">{ordinance.name}</div>
          {ordinance.topics && (
            <div className="mt-2 flex flex-wrap gap-1">
              {ordinance.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
        {ordinance.effectiveDate && (
          <div className="text-right ml-4">
            <div className="text-sm font-medium text-gray-900">
              {ordinance.effectiveDate}
            </div>
            <div className="text-xs text-gray-500">시행일</div>
          </div>
        )}
      </div>
    </div>
  );
}
