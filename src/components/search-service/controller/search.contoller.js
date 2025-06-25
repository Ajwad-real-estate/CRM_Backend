import * as services from '../service/search.service.js';

export const searchByPhoneNumber = async (req, res) => {
    try {
      const result = await services.fetchPhoneNumbers(req);
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error("Error in controller:", err);
      res.status(500).json({ message: "Internal server error." });
    }
};

export const getSearchFilters = async (req, res) => {
  try {
    const result = await services.fetchPhoneNumbers(req);
    res.status(201).json({
      category: ['Project Alpha', 'Project Epsilon', 'Project Beta', 'Project Delta', 'Project Gamma'],
      city: [],
      project: [],
      min_price: [],
      max_price: [],
      price: [100000, 90000, 120000, 150000, 80000],
      min_space: [],
      max_space: [],
      space: [120, 170, 150, 400, 230],
      instant_delivery: [],
      payment_method: [],
      building_type: [],
      type: ['Apartment', 'Townhouse', 'Villa', 'Penthouse', 'Studio'],
      bedrooms: [],
      bathrooms: [],
      garden: [],
      elevator: [],
      unit_rent_sale: [],
      unit_finish: [],
      unit_view: [],
      unit_floor: [],
      status: ['available', 'available', 'available', 'available', 'available'],
      city: ['Cairo', 'Aswan', 'Alexandria', 'Luxor', 'Giza'],
      region: ['Downtown', 'Modern Lane', 'Seaside', 'Ancient Avenue', 'Historical District']
    });
  } catch (err) {
    console.error("Error in controller:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const searchByMuliptleFilters = async (req,res) => {
    try {

      const queryUrl = req.originalUrl;

      const query = await services.searchByMuliptleFiltersDetailed(queryUrl)

      const excecute = await services.getDataByFilters(query)

      // Return structured response
      res.status(200).json({
        success: true,
        results: excecute
    });

    } catch (error) {
      res.status(404).send(error.message)
    }
}