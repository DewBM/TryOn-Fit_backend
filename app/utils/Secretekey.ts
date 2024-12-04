import { createHash } from 'crypto';

/**
 * Generate the hash value for PayHere.
 * @param merchantId - The merchant ID.
 * @param orderId - The order ID.
 * @param amount - The transaction amount.
 * @param currency - The currency code (e.g., "LKR").
 * @param merchantSecret - The merchant secret key.
 * @returns The generated hash value.
 */
function generatePayHereHash(
    merchantId: string,
    orderId: string,
    amount: number,
    currency: string,
    merchantSecret: string
): string {
    // Format the amount to 2 decimal places without commas
    const formattedAmount = amount.toFixed(2).replace(/,/g, '');
    
    // Hash the merchant secret and convert to uppercase
    const hashedSecret = createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    
    // Concatenate values using the + operator and generate the final hash
    const concatenatedString = merchantId + orderId + formattedAmount + currency + hashedSecret;
    const finalHash = createHash('md5').update(concatenatedString).digest('hex').toUpperCase();
    
    return finalHash;
}

// Example usage
export default generatePayHereHash;