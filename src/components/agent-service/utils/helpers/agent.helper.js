export const validateSalesInput = (body) => {
    const {
      username, email, password, name, roleId, cityId, street, phoneNumbers,
    } = body;
  
    return (
      username &&
      email &&
      password &&
      name &&
      roleId &&
      cityId &&
      street &&
      phoneNumbers &&
      phoneNumbers.length > 0
    );
  };
  
  export const checkDuplicates = (rows, input) => {
    let isUsernameTaken = false;
    let isEmailTaken = false;
    const duplicatePhoneNumbers = [];
  
    rows.forEach((user) => {
      if (user.username === input.username) isUsernameTaken = true;
      if (user.email === input.email) isEmailTaken = true;
      if (user.phone_number && input.phoneNumbers.includes(user.phone_number)) {
        duplicatePhoneNumbers.push(user.phone_number);
      }
    });
  
    const hasConflict = isUsernameTaken || isEmailTaken || duplicatePhoneNumbers.length > 0;
  
    const messageParts = [];
    if (isUsernameTaken) messageParts.push("Username");
    if (isEmailTaken) messageParts.push("Email");
    if (duplicatePhoneNumbers.length > 0) messageParts.push("Phone numbers");
  
    return {
      hasConflict,
      responseBody: {
        message: `${messageParts.join(", ")} already taken.`,
        duplicatePhoneNumbers,
      },
    };
  };
  