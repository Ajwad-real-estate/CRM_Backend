export const getPhoneNumbers = `
  SELECT 
    c.*, 
    array_agg(cp.phone_number) AS phone_numbers
FROM 
    client c
LEFT JOIN 
    client_phone cp
    ON c.id = cp.client_id AND cp.phone_number LIKE $1
GROUP BY 
    c.id
HAVING 
    COUNT(cp.phone_number) > 0;
`;

export const getDataByFilters = (query) => {
    return `
    select p."name" as devolper , b."name" as type , c."name" as governate , a.street as region, a.price,a.space, a.status, a.created_at, a.updated_at, a.bedrooms, a.bathrooms, a.garden, a.elevator, a.unit_rent_sale, a.unit_finish, a.unit_view, a.unit_floor,a.payment_method,a.instant_delivery, a.code,pc.category_name
FROM public.unit a
join public.unit_type b on a.type_id = b.id
join public.city c on a.city_id = c.id
join public.project p on a.project_id = p.id
join public.project_categories pc on pc.id = a.category_id
where ` + query
}
