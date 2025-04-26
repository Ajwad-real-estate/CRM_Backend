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