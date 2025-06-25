import { getPool } from "../../../db/db.js";
import { Filter } from "../models/filters.search.model.js";
import * as Queries from "../utils/quires/search.quires.js";

export const fetchPhoneNumbers = async (req) => {
    const phoneNumber = req.params.phone;
    const pool = await getPool();
  
    const likePhone = `%${phoneNumber}%`;
    const { rows: clients } = await pool.query(Queries.getPhoneNumbers, [likePhone]);
  
    return {
      status: 200,
      body: { clients },
    };
};

export const searchByMuliptleFiltersDetailed = async (queryUrl) => {
  try {
    const whereConditions = Filter.getWhereFromUrl(queryUrl);
  
    return `
      select p."name" as devolper , b."name" as type , c."name" as governate , a.street as region, a.price,a.space, a.status, a.created_at, a.updated_at, a.bedrooms, a.bathrooms, a.garden, a.elevator, a.unit_rent_sale, a.unit_finish, a.unit_view, a.unit_floor,a.payment_method,a.instant_delivery, a.code,pc.category_name 
      FROM public.unit a 
      join public.unit_type b on a.type_id = b.id 
      join public.city c on a.city_id = c.id 
      join public.project p on a.project_id = p.id 
      join public.project_categories pc on pc.id = a.category_id 
      ${whereConditions}`;

  } catch (error) {
      throw new Error(error.message);
  }
}

export const getDataByFilters = async (query) => {
  try {
    const pool = await getPool();
    return (await pool.query(query)).rows
  } catch (error) {
    throw new Error(error.message);
  }
};