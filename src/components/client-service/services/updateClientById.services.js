import { 
    updateClientQuery, 
    deleteClientPhonesQuery, 
    insertClientPhonesQuery,
    getUpdatedClientWithPhonesQuery, 
  } from "../utils/queries/clientQueries.js";
  
  export const updateClientByIdService = async (clientId, updates) => {
    const allowedFields = [
      'name', 'age', 'email', 'city_id', 'street',
      'channel', 'type', 'status', 'budget',
      'agent_id', 'assign_time', 'nat_id'
    ];
  
    const updateData = {};
    for (const key of Object.keys(updates)) {
      if (allowedFields.includes(key)) {
        updateData[key] = updates[key];
      }
    }
  
    if (Object.keys(updateData).length === 0) {
      return { error: "No valid fields to update." };
    }
  
    try {
      // Update main client data
      await updateClientQuery(clientId, updateData);
      
      // Handle phone numbers update if provided
      if (updates.phone_numbers && Array.isArray(updates.phone_numbers)) {
        // Delete existing phone numbers
        await deleteClientPhonesQuery(clientId);
        
        // Insert new phone numbers if there are any valid ones
        const validPhoneNumbers = updates.phone_numbers.filter(phone => phone);
        if (validPhoneNumbers.length > 0) {
          await insertClientPhonesQuery(clientId, validPhoneNumbers);
        }
      }
      
      // Get updated client with phone numbers
      const updatedClient = await getUpdatedClientWithPhonesQuery(clientId);
      
      if (updatedClient.length === 0) {
        return null;
      }
      
      // Clean up null values in phone_numbers array
      if (updatedClient[0].phone_numbers[0] === null) {
        updatedClient[0].phone_numbers = [];
      }
      
      return updatedClient[0];
    } catch (error) {
      throw error;
    }
  };