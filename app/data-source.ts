import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";

export const AppDataSource = new DataSource({
   type: "postgres",
   host: "localhost",
   port: 5432,
   username: "g_30",
   password: "tryonfit@ucsc",
   database: "TryOn-Fit",
   synchronize: true,
   logging: true,
   entities: [],
   subscribers: [],
   migrations: [],
})