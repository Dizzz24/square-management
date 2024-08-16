const { addOrUpdateCustomer, getAllCustomers, getCustomerDetails, softDeleteCustomer, getAllMenuItems, updateTransactionCount } = require('../models');

const addNewCustomer = async (req, res, next) => {
  try {
    const { name, menuId, count } = req.body;

    if (!name, !menuId, !count) throw { message: "Name, menuId, or Count, is required", status: 400 };

    let { status } = await addOrUpdateCustomer(name, menuId, count);

    res.status(status === "created" ? 201 : 200).json({ message: `Customer data has been ${status === "created" ? "Created" : "Updated"}` });
  } catch (error) {
    console.error(error, "< === Error on addNewCostumer");
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'name', sortOrder = 'ASC', level = '' } = req.query;

    console.log({ page, limit, search, sortBy, sortOrder, level }, "<, ==== ")

    const offset = (page - 1) * limit;

    const { total, customers } = await getAllCustomers({
      search,
      sortBy,
      sortOrder,
      limit,
      offset,
      level,
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages,
      totalCustomers: total,
      customers,
    });
  } catch (error) {
    console.error(error, "< === Error on getCustomers");
    next(error);
  }
};


const getDetails = async (req, res, next) => {
  try {
    const customerId = req.params?.id;

    if (!customerId) throw { message: "Please provide a valid id", status: 400 };

    const customers = await getCustomerDetails(customerId);
    res.status(200).json(customers);
  } catch (error) {
    console.error(error, "< === Error on getDetails");
    next(error);
  }
};

const delCustomer = async (req, res, next) => {
  try {
    const customerId = req.params?.id;

    if (!customerId) throw { message: "Please provide a valid id", status: 400 };

    const customers = await softDeleteCustomer(customerId);

    res.status(200).json({ message: `${customers.name}, been successfully deleted` });
  } catch (error) {
    console.error(error, "< === Error on delCustomer");
    next(error);
  }
};

const putTransactionCount = async (req, res, next) => {
  try {
    const menuId = req.params?.id;
    const newCount = req.body?.newCount

    if (!menuId) throw { message: "Please provide a valid id", status: 400 };
    if (!newCount) throw { message: "Please provide a new count", status: 400 };

    await updateTransactionCount(menuId, newCount);

    res.status(200).json({ message: `has successfully updated the count, new count: ${newCount}` });
  } catch (error) {
    console.error(error, "< === Error on delCustomer");
    next(error);
  }
};

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error, "< +==");
    res.status(500).json({ error: 'Failed to retrieve menu items' });
  }
};

module.exports = {
  getMenuItems,
};

module.exports = {
  addNewCustomer,
  getCustomers,
  getDetails,
  delCustomer,
  putTransactionCount,
  getMenuItems
};