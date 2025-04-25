export const fetchRoleTitleById = `
  SELECT title FROM role WHERE id = $1
`;

export const fetchRolesByTitles = `
  SELECT id, title 
  FROM role
  WHERE title = ANY($1)
  ORDER BY array_position($1, title)
`;
