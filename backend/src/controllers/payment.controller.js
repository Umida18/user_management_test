import { success } from "../utils/apiResponse.js";

const mockPayments = [
  {
    id: 1,
    amount: 150000,
    currency: "UZS",
    status: "completed",
    description: "Oylik to'lov",
    date: "2025-05-01",
  },
  {
    id: 2,
    amount: 75000,
    currency: "UZS",
    status: "pending",
    description: "Xizmat to'lovi",
    date: "2025-05-10",
  },
  {
    id: 3,
    amount: 300000,
    currency: "UZS",
    status: "completed",
    description: "Yillik obuna",
    date: "2025-04-20",
  },
  {
    id: 4,
    amount: 50000,
    currency: "UZS",
    status: "failed",
    description: "Qayta to'lov",
    date: "2025-05-15",
  },
  {
    id: 5,
    amount: 200000,
    currency: "UZS",
    status: "completed",
    description: "Premium tarif",
    date: "2025-05-18",
  },
];

const getPayments = (req, res) => {
  return success(res, mockPayments);
};

export { getPayments };
