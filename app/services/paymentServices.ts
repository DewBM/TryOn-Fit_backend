import PaymentDAO from "../db/dao/paymentDAO";

class PaymentService {
  async initiatePayment(userId: number, amount: number) {
    // Business logic, e.g., validations, external API calls
    if (amount <= 0) {
      throw new Error("Invalid payment amount");
    }
    const paymentData = await PaymentDAO.createPayment(userId, amount);
    return paymentData; // Return the created payment record
  }
}

export default new PaymentService();
