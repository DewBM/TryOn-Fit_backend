import { eq, gte } from "drizzle-orm";
import { db } from "..";
import { inquiry_reportTable } from "../schema/InquiryForm";

// Get total pending inquiries
export async function getTotalPendingInquiries(): Promise<number> {
  const result = await db
    .select()
    .from(inquiry_reportTable)
    .where(eq(inquiry_reportTable.status, 'pending'));
  return result.length;
}

// Get total solved inquiries
export async function getTotalSolvedInquiries(): Promise<number> {
  const result = await db
    .select()
    .from(inquiry_reportTable)
    .where(eq(inquiry_reportTable.status, 'solved'));
  return result.length;
}

// Get total inquiries for today
export async function getTotalInquiriesToday(): Promise<number> {
  const result = await db
    .select()
    .from(inquiry_reportTable)
    .where(gte(inquiry_reportTable.date, new Date(new Date().setHours(0, 0, 0, 0)))); 
  return result.length;
}
