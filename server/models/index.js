const { query } = require('../db/config');
const defLevel = require('../utilitys/defLevel');


const getAllCustomers = async ({ search, sortBy, sortOrder, limit, offset, level }) => {
    try {
        // Initialize query parts
        let whereConditions = `WHERE c."isDeleted" = FALSE`;
        const queryParams = [];

        // Add search condition
        if (search) {
            queryParams.push(`%${search}%`);
            whereConditions += ` AND c.name ILIKE $${queryParams.length}`;
        }

        // Add level condition
        if (level) {
            queryParams.push(level);
            whereConditions += ` AND c.level = $${queryParams.length}`;
        }

        // Add sorting, limit, and offset
        queryParams.push(limit, offset);

        const customersQueryText = `
        SELECT 
          c.id, 
          c.name, 
          c.level, 
          c."totalTransaction",
          m.name AS "favoriteMenuName"
        FROM "Customers" c
        JOIN "Menu" m ON c."favoriteMenuId" = m.id
        ${whereConditions}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length};
      `;

        const totalQueryText = `
        SELECT COUNT(*) 
        FROM "Customers" c
        ${whereConditions};
      `;

        // Execute the queries
        const customersResult = await query(customersQueryText, queryParams);
        const totalResult = await query(totalQueryText, queryParams.slice(0, queryParams.length - 2));

        return {
            customers: customersResult.rows,
            total: parseInt(totalResult.rows[0].count, 10),
        };
    } catch (error) {
        console.error('Error retrieving customers:', error);
        throw error;
    }
};

const calculateTotalTransaction = async (customerId) => {
    const { rows } = await query(`
    SELECT COALESCE(SUM(t.count * m.price), 0) AS "totalTransaction"
    FROM "Transactions" t
    JOIN "Menu" m ON t."menuId" = m.id
    WHERE t."customerId" = $1
  `, [customerId]);

    return parseFloat(rows[0].totalTransaction);
};

const updateCustomerLevel = async (customerId) => {
    try {
        const totalTransaction = await calculateTotalTransaction(customerId);
        const level = defLevel(totalTransaction);

        await query(`
      UPDATE "Customers"
      SET level = $1, "totalTransaction" = $2
      WHERE id = $3;
    `, [level, totalTransaction, customerId]);
    } catch (error) {
        console.error('Error updating customer level:', error);
        throw error;
    }
};

const updateFavoriteMenu = async (customerId) => {
    try {
        const { rows } = await query(`
      SELECT t."menuId"
      FROM "Transactions" t
      WHERE t."customerId" = $1
      GROUP BY t."menuId"
      ORDER BY SUM(t.count) DESC
      LIMIT 1;
    `, [customerId]);

        if (rows.length > 0) {
            const favoriteMenuId = rows[0].menuId;

            await query(`
        UPDATE "Customers"
        SET "favoriteMenuId" = $1
        WHERE id = $2;
      `, [favoriteMenuId, customerId]);
        }
    } catch (error) {
        console.error('Error updating favorite menu:', error);
        throw error;
    }
};

const addTransactionAndUpdateCustomer = async (customerId, menuId, count) => {
    try {
        await query(`
      INSERT INTO "Transactions" ("customerId", "menuId", count)
      VALUES ($1, $2, $3);
    `, [customerId, menuId, count]);

        await updateCustomerLevel(customerId);
        await updateFavoriteMenu(customerId);
    } catch (error) {
        console.error('Error updating customer with new transaction:', error);
        throw error;
    }
};

const addOrUpdateCustomer = async (name, menuId, count) => {
    try {
        const customerResult = await query(`
      SELECT * FROM "Customers" 
      WHERE name = $1 AND "isDeleted" = FALSE;
    `, [name]);

        let status;

        if (customerResult.rows.length > 0) {
            const existingCustomer = customerResult.rows[0];
            await addTransactionAndUpdateCustomer(existingCustomer.id, menuId, count);

            status = "updated"
        } else {
            const { rows: menuRows } = await query(`
        SELECT price FROM "Menu" WHERE id = $1;
      `, [menuId]);

            const totalTransaction = menuRows.length > 0 ? menuRows[0].price * count : 0;
            const level = defLevel(totalTransaction);

            const newCustomerResult = await query(`
        INSERT INTO "Customers" (name, level, "favoriteMenuId", "totalTransaction")
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, level, "favoriteMenuId", "totalTransaction", "createdAt", "updatedAt";
      `, [name, level, menuId, totalTransaction]);

            status = "created"

            await addTransactionAndUpdateCustomer(newCustomerResult.rows[0].id, menuId, count);
        }

        return { status };
    } catch (error) {
        console.error('Error adding or updating customer:', error);
        throw error;
    }
};

const getCustomerDetails = async (customerId) => {
    try {
        const customerQuery = `
            SELECT 
                c.id, c.name, c.level, c."totalTransaction", 
                m.name AS "favoriteMenuName"
            FROM "Customers" c
            LEFT JOIN "Menu" m ON c."favoriteMenuId" = m.id
            WHERE c.id = $1 AND c."isDeleted" = FALSE;
        `;

        const transactionsQuery = `
            SELECT t.id, t.date, t.count, m.name AS "menuName", m.price AS "menuPrice"
            FROM "Transactions" t
            JOIN "Menu" m ON t."menuId" = m.id
            WHERE t."customerId" = $1;
        `;

        const customerQ = await query(customerQuery, [customerId]);
        let customer = customerQ.rows[0]
        const transactions = await query(transactionsQuery, [customerId]);

        if (!customer) return { message: "Customer not found" };

        return {
            customer,
            transactions: transactions.rows,
        };
    } catch (error) {
        console.error('Error retrieving customer details:', error);
        throw error;
    }
};

const softDeleteCustomer = async (customerId) => {
    try {
        const { rows } = await query(`
      UPDATE "Customers" 
      SET "isDeleted" = true 
      WHERE id = $1 
      RETURNING *;
    `, [customerId]);

        return rows[0];
    } catch (error) {
        console.error('Error soft deleting customer:', error);
        throw error;
    }
};

// Transaction
const updateTransactionCount = async (transactionId, newCount) => {
    try {
        const { rows } = await query(`
      UPDATE "Transactions" 
      SET "count" = $1 
      WHERE id = $2 
      RETURNING "customerId";
    `, [newCount, transactionId]);

        if (rows.length > 0) {
            await updateCustomerLevel(rows[0].customerId);
            await updateFavoriteMenu(rows[0].customerId);
        }

        return rows[0];
    } catch (error) {
        console.error('Error updating transaction count:', error);
        throw error;
    }
};


// Menu
const getAllMenuItems = async () => {
    const text = 'SELECT * FROM "Menu";';
    const result = await query(text);
    return result.rows;
};

module.exports = {
    addOrUpdateCustomer,
    getCustomerDetails,
    updateTransactionCount,
    softDeleteCustomer,
    getAllCustomers,
    getAllMenuItems
};
