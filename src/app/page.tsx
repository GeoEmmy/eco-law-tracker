import Link from "next/link";
import { LawData } from "@/types/law";

async function getLawData(): Promise<LawData> {
  const data = await import("../../public/data/laws-to-track.json");
  return data as unknown as LawData;
}

export default async function Home() {
  const data = await getLawData();

  const recentLaws = data.nationalLaws
    .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())
    .slice(0, 5);

  const totalOrdinances = Object.values(data.localOrdinances)
    .reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          친환경 건축 법규 트래커
        </h1>
        <p className="mt-2 text-gray-600">
          건축물 친환경 관련 법규의 버전 관리 및 시점 기반 조회 시스템
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-green-600">
            {data.nationalLaws.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">국가 법령</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-blue-600">
            {Object.keys(data.localOrdinances).length}
          </div>
          <div className="text-sm text-gray-500 mt-1">지자체</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-purple-600">
            {totalOrdinances}
          </div>
          <div className="text-sm text-gray-500 mt-1">지방 조례</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-orange-600">
            {data.waterReuseOrdinances.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">물 재이용 조례</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">최근 시행 법령</h2>
        </div>
        <div className="divide-y">
          {recentLaws.map((law) => (
            <div key={law.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    href={`/laws/${law.id}`}
                    className="font-medium text-gray-900 hover:text-green-600"
                  >
                    {law.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${law.category === '법률' ? 'bg-red-100 text-red-800' : ''}
                      ${law.category === '고시' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${law.category === '규칙' ? 'bg-blue-100 text-blue-800' : ''}
                    `}>
                      {law.category}
                    </span>
                    {law.topics?.slice(0, 3).map((topic) => (
                      <span key={topic} className="text-xs text-gray-500">
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {law.effectiveDate}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t bg-gray-50">
          <Link href="/laws" className="text-sm text-green-600 hover:text-green-700 font-medium">
            전체 법령 보기 &rarr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/laws"
          className="bg-white p-6 rounded-lg shadow-sm border hover:border-green-300 transition-colors"
        >
          <h3 className="font-semibold text-gray-900">법령 목록</h3>
          <p className="mt-1 text-sm text-gray-500">전체 법령 및 조례 조회</p>
        </Link>
        <Link
          href="/timeline"
          className="bg-white p-6 rounded-lg shadow-sm border hover:border-green-300 transition-colors"
        >
          <h3 className="font-semibold text-gray-900">시점 조회</h3>
          <p className="mt-1 text-sm text-gray-500">특정 날짜 기준 유효 법령 확인</p>
        </Link>
        <Link
          href="/changelog"
          className="bg-white p-6 rounded-lg shadow-sm border hover:border-green-300 transition-colors"
        >
          <h3 className="font-semibold text-gray-900">변경 이력</h3>
          <p className="mt-1 text-sm text-gray-500">법령 개정 히스토리</p>
        </Link>
      </div>
    </div>
  );
}
