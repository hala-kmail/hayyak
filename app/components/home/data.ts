/** نوع بيانات الحي للمسابقة */
export interface NeighborhoodItem {
  id: string;
  name: string;
  location: string;
  votes: number;
  icon: string;
  iconBg: string;
  percentage: number;
  /** سقف الأصوات لحساب نسبة الإنجاز (اختياري) */
  totalCap?: number;
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
    totalCap: 600,
  },
  {
    id: '2',
    name: 'حي البستان',
    location: 'الرياض - شرق الطريق الدائري',
    votes: 294,
    icon: '🌸',
    iconBg: 'rgb(254, 226, 226)',
    percentage: 23,
    totalCap: 600,
  },
  {
    id: '3',
    name: 'حي الأخوة',
    location: 'الرياض - غرب العليا',
    votes: 267,
    icon: '⛰️',
    iconBg: 'rgb(220, 252, 231)',
    percentage: 21,
    totalCap: 600,
  },
  {
    id: '4',
    name: 'حي النور',
    location: 'الرياض - جنوب النخيل',
    votes: 351,
    icon: '☀️',
    iconBg: 'rgb(224, 242, 254)',
    percentage: 57,
    totalCap: 600,
  },
  {
    id: '5',
    name: 'حي الورود',
    location: 'الرياض - وسط المدينة',
    votes: 412,
    icon: '🌹',
    iconBg: 'rgb(255, 228, 230)',
    percentage: 68,
    totalCap: 600,
  },
  {
    id: '6',
    name: 'حي الفيصلية',
    location: 'الرياض - شمال الملك فهد',
    votes: 289,
    icon: '🏛️',
    iconBg: 'rgb(237, 242, 247)',
    percentage: 48,
    totalCap: 600,
  },
  {
    id: '7',
    name: 'حي العليا',
    location: 'الرياض - شرق الملك فهد',
    votes: 523,
    icon: '🏙️',
    iconBg: 'rgb(240, 253, 244)',
    percentage: 87,
    totalCap: 600,
  },
  {
    id: '8',
    name: 'حي المطار',
    location: 'الرياض - شرق المطار',
    votes: 198,
    icon: '✈️',
    iconBg: 'rgb(254, 243, 199)',
    percentage: 33,
    totalCap: 600,
  },
  {
    id: '9',
    name: 'حي العريجاء',
    location: 'الرياض - جنوب العريجاء',
    votes: 456,
    icon: '🌳',
    iconBg: 'rgb(220, 252, 231)',
    percentage: 76,
    totalCap: 600,
  },
  {
    id: '10',
    name: 'حي السليمانية',
    location: 'الرياض - وسط السليمانية',
    votes: 334,
    icon: '🏘️',
    iconBg: 'rgb(224, 242, 254)',
    percentage: 56,
    totalCap: 600,
  },
  {
    id: '11',
    name: 'حي المروج',
    location: 'الرياض - شمال المروج',
    votes: 267,
    icon: '🌿',
    iconBg: 'rgb(204, 251, 241)',
    percentage: 45,
    totalCap: 600,
  },
  {
    id: '12',
    name: 'حي الياسمين',
    location: 'الرياض - شرق الياسمين',
    votes: 389,
    icon: '🌺',
    iconBg: 'rgb(255, 237, 213)',
    percentage: 65,
    totalCap: 600,
  },
];

export const totalVotes = MOCK_NEIGHBORHOODS.reduce((s, n) => s + n.votes, 0);
