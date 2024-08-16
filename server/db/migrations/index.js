const { query } = require('../config');

const createTables = async () => {
  try {
    await query(`DROP TABLE IF EXISTS "Transactions";`);
    await query(`DROP TABLE IF EXISTS "Customers";`);
    await query(`DROP TABLE IF EXISTS "Menu";`);

    console.log("Tables dropped successfully.");

    const createMenuTable = `
      CREATE TABLE IF NOT EXISTS "Menu" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createCustomersTable = `
      CREATE TABLE IF NOT EXISTS "Customers" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        level VARCHAR(50) DEFAULT 'Warga',
        "favoriteMenuId" INT REFERENCES "Menu"(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE,
        "totalTransaction" INT DEFAULT 0,
        "isDeleted" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createTransactionsTable = `
      CREATE TABLE IF NOT EXISTS "Transactions" (
        id SERIAL PRIMARY KEY,
        date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        count INT NOT NULL,
        "customerId" INT REFERENCES "Customers"(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        "menuId" INT REFERENCES "Menu"(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await query(createMenuTable);
    await query(createCustomersTable);
    await query(createTransactionsTable);

    console.log("Tables created successfully.");
  } catch (err) {
    console.error(err, "< === Error on Migrations");
  }
};

createTables();