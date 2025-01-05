import crypto from "crypto";

export function generateHashCode(
 
  
  merchantSecretId: string,
  merchantId: string,

): string {
 
 
  const inputString = merchantId  + merchantSecretId;
  

  const hash = md5(inputString).toUpperCase();

  console.log("Generated Hash:", hash);
  return hash;
}

// Helper function to generate MD5 hash
function md5(input: string): string {
  return crypto.createHash("md5").update(input).digest("hex");
}
