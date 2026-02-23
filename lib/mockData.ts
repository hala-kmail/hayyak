/**
 * بيانات وهمية للعمل بدون API (للفحص والتطوير المحلي)
 * تفعيل: NEXT_PUBLIC_USE_MOCK_DATA=true في .env.local
 */

export interface MockTown {
  id: string;
  name: string;
  address: string;
  votes: number;
  percentage?: number;
}

const totalVotesSum = 4155;

export const MOCK_TOWNS: MockTown[] = [
  { id: '1', name: 'حي النخيل', address: 'الرياض - شمال العريض', votes: 375, percentage: 9 },
  { id: '2', name: 'حي البستان', address: 'الرياض - شرق الطريق الدائري', votes: 294, percentage: 7 },
  { id: '3', name: 'حي الأخوة', address: 'الرياض - غرب العليا', votes: 267, percentage: 6 },
  { id: '4', name: 'حي النور', address: 'الرياض - جنوب النخيل', votes: 351, percentage: 8 },
  { id: '5', name: 'حي الورود', address: 'الرياض - وسط المدينة', votes: 412, percentage: 10 },
  { id: '6', name: 'حي الفيصلية', address: 'الرياض - شمال الملك فهد', votes: 289, percentage: 7 },
  { id: '7', name: 'حي العليا', address: 'الرياض - شرق الملك فهد', votes: 523, percentage: 13 },
  { id: '8', name: 'حي المطار', address: 'الرياض - شرق المطار', votes: 198, percentage: 5 },
  { id: '9', name: 'حي العريجاء', address: 'الرياض - جنوب العريجاء', votes: 456, percentage: 11 },
  { id: '10', name: 'حي السليمانية', address: 'الرياض - وسط السليمانية', votes: 334, percentage: 8 },
  { id: '11', name: 'حي المروج', address: 'الرياض - شمال المروج', votes: 267, percentage: 6 },
  { id: '12', name: 'حي الياسمين', address: 'الرياض - شرق الياسمين', votes: 389, percentage: 9 },
];

export const MOCK_STATS = {
  totalVotes: totalVotesSum,
  todayVotes: 142,
};

export const MOCK_ELECTION_STATUS = {
  isOpen: true,
  mode: 'manual' as const,
  timezone: 'Asia/Riyadh',
  startAt: null,
  endAt: null,
};

export const MOCK_TOP3 = [
  { id: '7', name: 'حي العليا', votes: 523, percentage: 13, rank: 1 },
  { id: '9', name: 'حي العريجاء', votes: 456, percentage: 11, rank: 2 },
  { id: '5', name: 'حي الورود', votes: 412, percentage: 10, rank: 3 },
];

export const MOCK_VISITOR_COUNT = {
  totalVisits: 1250,
  uniqueVisitors: 890,
};

/** هل وضع البيانات الوهمية مفعّل؟ (بدون API) */
export function isMockDataEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
}
