import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../db/index';
import { customers, SelectCustomer } from '../db/schema/Customer';

export async function getUserById(id: SelectCustomer['customer_id']): Promise<
  Array<{
    customer_id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  }>
> {
  return db.select().from(customers);
}