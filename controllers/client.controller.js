const Client = require("../models/Client");  

exports.store = async (req, res, next) => {
  const {
    name,
    email,
    nationalID,
    areMarried,
    hasChildren,
    stage,
    interestedInProjects,
    ticket,
    addressCurrentHome,
    addressNowHome,
    comment,
    positionWork,
    companyWork,
    fieldWork,
    salesAgent,
    phoneNumbers,
    interestedInLocations,
    transactions,
  } = req.body;

  try {
    const client = await Client.create({
      name,
      email,
      nationalID,
      areMarried,
      hasChildren,
      stage,
      interestedInProjects,
      ticket,
      addressCurrentHome,
      addressNowHome,
      comment,
      positionWork,
      companyWork,
      fieldWork,
      salesAgent,
      phoneNumbers,
      interestedInLocations,
      transactions,
    });

    res.status(201).json({
      msg: "Client created successfully",
      client: client,
    });
  } catch (err) {
    const error = new Error("Could not create a client");
    console.error(err);
    error.statusCode = 500;
    next(error);
  }
};

 

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    email,
    nationalID,
    areMarried,
    hasChildren,
    stage,
    interestedInProjects,
    ticket,
    addressCurrentHome,
    addressNowHome,
    comment,
    positionWork,
    companyWork,
    fieldWork,
    salesAgent,
    phoneNumbers,
    interestedInLocations,
    transactions,
  } = req.body;

  try {
    const client = await Client.findByIdAndUpdate(
      id,
      {
        name,
        email,
        nationalID,
        areMarried,
        hasChildren,
        stage,
        interestedInProjects,
        ticket,
        addressCurrentHome,
        addressNowHome,
        comment,
        positionWork,
        companyWork,
        fieldWork,
        salesAgent,
        phoneNumbers,
        interestedInLocations,
        transactions,
      },
      {
        new: true,
      }
    );

    if (!client) {
      const error = new Error("Client not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      msg: "Client updated successfully",
      client: client,
    });
  } catch (err) {
    const error = new Error("Could not update the client");
    error.statusCode = 500;
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      const error = new Error(
        "Client not found or you are not allowed to delete"
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      msg: "Client deleted successfully",
    });
  } catch (err) {
    const error = new Error("Could not delete the client");
    error.statusCode = 500;
    next(error);
  }
};

exports.getClient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);

    if (!client) {
      const error = new Error("Client not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      msg: "success",
      data: client,
    });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

exports.getAllClients = async (req, res, next) => {
  try {
    const excluded = ["sort", "page", "limit", "fields"];
    const queryObj = { ...req.query };
    excluded.forEach((element) => delete queryObj[element]);

    const querySTR = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (val) => `$${val}`
    );

    let query = Client.find(JSON.parse(querySTR));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query.sort(sortBy);
    } else {
      query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query.select(fields);
    } else {
      query.select("-__v");
    }

    if (req.query.limit && req.query.page) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      query.skip((page - 1) * limit).limit(limit);
    }

    const clients = await query;
    res.status(200).json({
      msg: "Successful fetch",
      data: clients,
    });
  } catch (err) {
    next(err);
  }
};
