export const getAllProjectsIDS = `
  SELECT a.id, a.company, a."name", cy."name" , a.street, a.landing_page
FROM project a
JOIN city cy on a.city_id = cy.id
JOIN unit u on a.id = u.project_id
WHERE u.status = 'available'
`;

export const getAllUnitsForProject = `
  SELECT a.id, a."name", a.type_id, cy."name", a.street,a.status , a.price, a.status
FROM unit a
join city cy
on a.city_id = cy.id
where a.status = 'available' and a.project_id = $1

`;