/** نوع بيانات الحي للمسابقة */
export interface NeighborhoodItem {
  id: string;
  name: string;
  location: string;
  votes: number;
  icon: string;
  iconBg: string;
  percentage: number;
}

/** بيانات الأحياء (مؤقتة - يمكن استبدالها بـ API لاحقاً) */
export const MOCK_NEIGHBORHOODS: NeighborhoodItem[] = [
  {
    id: '1',
    name: 'حي النخيل',
    location: 'الرياض - شمال العريض',
    votes: 375,
    icon: '🌴',
    iconBg: 'rgb(204, 251, 241)',
    percentage: 29,
  },
  {
    id: '2',
    name: 'حي البستان',
    location: 'الرياض - شرق الطريق الدائري',
    votes: 294,
    icon: '🌸',
    iconBg: 'rgb(254, 226, 226)',
    percentage: 23,
  },
  {
    id: '3',
    name: 'حي الأخوة',
    location: 'الرياض - غرب العليا',
    votes: 267,
    icon: '⛰️',
    iconBg: 'rgb(220, 252, 231)',
    percentage: 21,
  },
  {
    id: '4',
    name: 'حي النور',
    location: 'الرياض - جنوب النخيل',
    votes: 351,
    icon: '☀️',
    iconBg: 'rgb(224, 242, 254)',
    percentage: 57,
  },
];

export const totalVotes = MOCK_NEIGHBORHOODS.reduce((s, n) => s + n.votes, 0);
