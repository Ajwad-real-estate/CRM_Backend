import { checkExistingPhoneNumbers, insertClient, insertClientPhones } from "../utils/queries/clientQueries.js";

export const createClientService = async (clientData) => {
  const {
    name,
    age,
    email,
    city_id,
    street,
    channel_id,
    type_id,
    status_id,
    budget,
    phoneNumbers,
  } = clientData;

  console.log(phoneNumbers);

  if (!phoneNumbers || phoneNumbers.length < 1)
    throw new Error("Phone number is required.");

  try {
    // Check if any phone number already exists
    const existingRows = await checkExistingPhoneNumbers(phoneNumbers);

    if (existingRows.length > 0) {
      const existingNumbers = existingRows.map((row) => row.phone_number);
      throw new Error(
        `Some phone numbers already exist: ${existingNumbers.join(", ")}`
      );
    }

    // Insert client into database
    const clientId = await insertClient({
      name,
      age,
      email,
      city_id,
      street,
      channel_id,
      type_id,
      status_id,
      budget
    });

    // Insert client's phone numbers
    await insertClientPhones(clientId, phoneNumbers);

    return { clientId, message: "Client created successfully." };
  } catch (error) {
    throw error; // Re-throw the error to handle in the controller
  }
};