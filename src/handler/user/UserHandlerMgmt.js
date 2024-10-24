import { apiResponse, apiError } from "../../commons/http-helpers/api-response";
import { validateRequestFields } from "../../commons/utils/validateUtils";
import { addRecord } from "../../commons/utils/dbMgmt";
import { connectDatabase } from "../../../database/db";
import { log } from "../../commons/utils/logger";
import middy from 'middy';
import { authenticator, handleErrorMiddleware } from "../../commons/middlewares/middlewares";

export const createUser = async (event) => {
  try {
    await connectDatabase(); // Connect to MongoDB
    const record = JSON.parse(event.body);
    const requiredFields = ["name", "email", "password"]; // Adjust as necessary
    const validationResponse = validateRequestFields(record, requiredFields);

    if (validationResponse !== true) {
      return apiError(400, { message: validationResponse });
    }

    const tableName = 'Users'; // Replace with actual table/collection name
    const response = await addRecord(record, requiredFields, tableName);
    return apiResponse(response.body, response.statusCode);
  } catch (error) {
    log.error(`Create User Error: ${error.message}`);
    return apiError(500, { message: error.message });
  }
};

// Wrap with middlewares for additional processing (authentication, error handling)
export const createUserHandler = middy(createUser)
  .use(authenticator())
  .use(handleErrorMiddleware());