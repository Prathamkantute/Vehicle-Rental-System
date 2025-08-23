import mysql from "mysql2/promise";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pratham_kantu20",
    database: "vehical_rental"
  });
    console.log("Connected to the database successfully");
  return connection;
}
