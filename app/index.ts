import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
// import routes from './routes';

const app = express();

app.use(bodyParser.json());
// app.use('/api', routes);

import { db } from './db';
import { customers } from './db/schema/Customer';

async function fetchCustomers() {
  try {
    const data = await db.select().from(customers);
    console.log(data);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

// fetchCustomers();

module.exports = app;