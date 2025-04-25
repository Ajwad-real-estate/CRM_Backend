export const getUserByIdQuery = `
  SELECT * FROM agent WHERE id = $1;
`;
