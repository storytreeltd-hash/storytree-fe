export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateTime: string;
  avatar: string;
};

export type AdminDashboardStats = {
  liveVisitors: number;
  uniqueVisitors: number;
  totalVisitors: number;
  averageSessionMinutes: number;
  averageSessionSeconds: number;
};

export const adminStats: AdminDashboardStats = {
  liveVisitors: 5,
  uniqueVisitors: 500,
  totalVisitors: 1403,
  averageSessionMinutes: 5,
  averageSessionSeconds: 45,
} as const;

export const adminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Natasha Jonah",
    email: "natasha@gmail.com",
    phone: "+234 9040217431",
    dateTime: "15 April, 2026 at 10:00 AM",
    avatar: "/image1.png",
  },
  {
    id: "2",
    name: "Emeka Okafor",
    email: "natasha@gmail.com",
    phone: "+234 9040217431",
    dateTime: "15 April, 2026 at 10:00 AM",
    avatar: "/image2.png",
  },
  {
    id: "3",
    name: "Ken Ikenna",
    email: "natasha@gmail.com",
    phone: "+234 9040217431",
    dateTime: "15 April, 2026 at 10:00 AM",
    avatar: "/image3.png",
  },
  {
    id: "4",
    name: "Ilyasu Emmanuel",
    email: "natasha@gmail.com",
    phone: "+234 9040217431",
    dateTime: "15 April, 2026 at 10:00 AM",
    avatar: "/community.png",
  },
  {
    id: "5",
    name: "Gabriel Mary Chinenye",
    email: "natasha@gmail.com",
    phone: "+234 9040217431",
    dateTime: "15 April, 2026 at 10:00 AM",
    avatar: "/hero.png",
  },
  {
    id: "6",
    name: "Amina Bello",
    email: "amina@gmail.com",
    phone: "+234 8034567890",
    dateTime: "14 April, 2026 at 3:30 PM",
    avatar: "/image1.png",
  },
  {
    id: "7",
    name: "Chidi Okonkwo",
    email: "chidi@gmail.com",
    phone: "+234 8056789012",
    dateTime: "14 April, 2026 at 11:15 AM",
    avatar: "/image2.png",
  },
  {
    id: "8",
    name: "Fatima Yusuf",
    email: "fatima@gmail.com",
    phone: "+234 8078901234",
    dateTime: "13 April, 2026 at 9:45 AM",
    avatar: "/image3.png",
  },
  {
    id: "9",
    name: "David Adeyemi",
    email: "david@gmail.com",
    phone: "+234 8090123456",
    dateTime: "13 April, 2026 at 2:00 PM",
    avatar: "/community.png",
  },
  {
    id: "10",
    name: "Zainab Ibrahim",
    email: "zainab@gmail.com",
    phone: "+234 8012345678",
    dateTime: "12 April, 2026 at 4:20 PM",
    avatar: "/hero.png",
  },
];
