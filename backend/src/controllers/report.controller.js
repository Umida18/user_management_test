import { success } from "../utils/apiResponse.js";

const mockReports = [
  {
    id: 1,
    title: "Oylik savdo hisoboti",
    period: "2025-05",
    totalSales: 4500000,
    orders: 120,
    status: "ready",
  },
  {
    id: 2,
    title: "Foydalanuvchilar faolligi",
    period: "2025-05",
    activeUsers: 340,
    newUsers: 45,
    status: "ready",
  },
  {
    id: 3,
    title: "Moliyaviy hisobot",
    period: "2025-04",
    revenue: 12000000,
    expenses: 3400000,
    status: "ready",
  },
  {
    id: 4,
    title: "Mahsulot tahlili",
    period: "2025-05",
    topProduct: "Premium tarif",
    units: 89,
    status: "processing",
  },
];

const getReports = (req, res) => {
  return success(res, mockReports);
};

export { getReports };
