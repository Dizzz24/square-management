const defLevel = require("../../utilitys/defLevel");
const { query, pool } = require("../config");
const { faker } = require("@faker-js/faker");

const seedMenu = async () => {
    try {
        const menuItems = [
            "Lemon Herb Chicken",
            "Spicy Tuna Roll",
            "Tagine-Rubbed Venison Salad",
            "Mango Sticky Rice",
            "Butternut Squash Soup",
            "Garlic Butter Shrimp",
            "Balsamic Glazed Salmon",
            "Coconut Curry Chicken",
            "Grilled Vegetable Panini",
            "Prosciutto-Wrapped Asparagus",
            "Pesto Pasta Salad",
            "Sesame Crusted Tofu",
            "Honey Glazed Duck",
            "Ratatouille",
            "Blueberry Pancakes",
            "Steak Frites",
            "Lobster Bisque",
            "Beef Wellington",
            "Cranberry Walnut Salad",
            "Chocolate Lava Cake"
        ];

        for (let i = 0; i < menuItems.length; i++) {
            const price = parseFloat(faker.commerce.price() * 100); // Asumsi harga dalam satuan cent
            await query(`
                INSERT INTO "Menu" (name, price)
                VALUES ($1, $2);
            `, [menuItems[i], price]);
        }

        console.log('Menu seeded successfully.');
    } catch (err) {
        console.error('Error seeding Menu:', err);
    }
};

const seedCustomers = async () => {
    try {
        for (let i = 0; i < 3; i++) {
            const name = faker.person.fullName();
            await query(`
                INSERT INTO "Customers" (name)
                VALUES ($1);
            `, [name]);
        }

        console.log('Customers seeded successfully.');
    } catch (err) {
        console.error('Error seeding Customers:', err);
    }
};

const seedTransactions = async () => {
    try {
        const customers = await query('SELECT id FROM "Customers";');
        const menus = await query('SELECT id FROM "Menu";');

        for (let i = 0; i < 20; i++) {
            const customerId = faker.helpers.arrayElement(customers.rows).id;
            const count = Math.floor(Math.random() * 10) + 1; // Menghasilkan nilai count antara 1-10
            const menuId = faker.helpers.arrayElement(menus.rows).id;
            await query(`
                INSERT INTO "Transactions" ("customerId", "count", "menuId")
                VALUES ($1, $2, $3);
            `, [customerId, count, menuId]);
        }

        console.log('Transactions seeded successfully.');
    } catch (err) {
        console.error('Error seeding Transactions:', err);
    }
};

const updateCustomerData = async () => {
    try {
        const customers = await query('SELECT id FROM "Customers";');

        for (const customer of customers.rows) {
            const { rows: totalRows } = await query(`
                SELECT COALESCE(SUM(t.count * m.price), 0) AS "totalTransaction"
                FROM "Transactions" t
                JOIN "Menu" m ON t."menuId" = m.id
                WHERE t."customerId" = $1
            `, [customer.id]);

            const totalTransaction = +totalRows[0].totalTransaction || 0;

            let level = defLevel(totalTransaction);

            const { rows: favoriteMenuRows } = await query(`
                SELECT t."menuId", COALESCE(SUM(t.count), 0) AS count
                FROM "Transactions" t
                WHERE t."customerId" = $1
                GROUP BY t."menuId"
                ORDER BY count DESC
                LIMIT 1
            `, [customer.id]);

            const { rowCount } = await query(`
                UPDATE "Customers"
                SET level = $1, "totalTransaction" = $2, "favoriteMenuId" = $3
                WHERE id = $4
            `, [level, totalTransaction, favoriteMenuId, customer.id]);
        }

        console.log('Customer data updated successfully.');
    } catch (err) {
        console.error('Error updating customer data:', err);
    }
};

const runSeeder = async () => {
    await seedMenu();
    await seedCustomers();
    await seedTransactions();
    await updateCustomerData();
    await pool.end();
};

runSeeder();
