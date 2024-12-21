import { getPool } from "../../configs/dbConfig.js";

const updateClient = async (req, res) => {
    const { clientId } = req.params;
    const updates = req.body;

    if (!clientId) {
        return res.status(400).json({ message: "Client Id is required." });
    }

    const pool = await getPool();
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Update the main client table
        const allowedFields = [
            'name', 'age', 'email', 'city_id', 'street',
            'channel', 'type', 'status', 'budget',
            'agent_id', 'assign_time', 'nat_id'
        ];

        const updateFields = Object.keys(updates)
            .filter(key => allowedFields.includes(key))
            .map((key, index) => `${key} = $${index + 2}`);

        if (updateFields.length > 0) {
            const updateQuery = `
        UPDATE client 
        SET ${updateFields.join(', ')},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
      `;

            const values = [clientId, ...Object.values(updates).filter((_, index) =>
                allowedFields.includes(Object.keys(updates)[index]))
            ];

            const { rows } = await client.query(updateQuery, values);

            // Handle phone numbers update if provided
            if (updates.phone_numbers && Array.isArray(updates.phone_numbers)) {
                // Delete existing phone numbers
                await client.query(
                    'DELETE FROM client_phone WHERE client_id = $1',
                    [clientId]
                );

                // Insert new phone numbers
                if (updates.phone_numbers.length > 0) {
                    const validPhoneNumbers = updates.phone_numbers.filter(phone => phone);

                    if (validPhoneNumbers.length > 0) {
                        const phoneValuesParams = validPhoneNumbers
                            .map((_, index) => `($1, $${index + 2})`)
                            .join(',');

                        const phoneQuery = `
              INSERT INTO client_phone (client_id, phone_number)
              VALUES ${phoneValuesParams}
            `;

                        await client.query(phoneQuery, [clientId, ...validPhoneNumbers]);
                    }
                }
            }

            // Fetch updated client with phone numbers
            const finalResult = await client.query(`
        SELECT 
          c.*, 
          array_agg(CASE WHEN cp.phone_number IS NOT NULL THEN cp.phone_number END) AS phone_numbers
        FROM 
          client c
        LEFT JOIN 
          client_phone cp
        ON 
          c.id = cp.client_id
        WHERE 
          c.id = $1
        GROUP BY 
          c.id;
      `, [clientId]);

            await client.query('COMMIT');

            if (finalResult.rows.length === 0) {
                return res.status(404).json({ message: "Client not found." });
            }

            // Clean up null values in phone_numbers array
            if (finalResult.rows[0].phone_numbers[0] === null) {
                finalResult.rows[0].phone_numbers = [];
            }

            res.status(200).json(finalResult.rows[0]);
        } else {
            res.status(400).json({ message: "No valid fields to update." });
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error updating client:", error);
        res.status(500).json({ message: "Internal server error." });
    } finally {
        client.release();
    }
};

export default updateClient;
