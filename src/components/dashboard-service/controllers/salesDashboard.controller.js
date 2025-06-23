import * as services from '../services/salesDashboard.services.js'

export const getSalesDashboard = async (req, res) => {
  try {
    const salesID = req.params.id;
    const dashboard = await services.prepareSalesDashboard(salesID)
    res.status(201).send(dashboard)
  } catch (error) {
    res.status(404).send({message : error.message})
  }
};

