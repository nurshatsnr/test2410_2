import { connectMongoDB } from "../../../commons/utils/mongoDB/dbConnector";
import { addRecord } from "../../../commons/utils/dbMgmt";
import { apiResponse, apiError } from "../../../commons/http-helpers/api-response";
import { log } from "../../../commons/utils/logger";
import middy from 'middy';
import { authenticator, handleErrorMiddleware } from "../../../commons/middlewares/middlewares";

export const createOrder = async (event) => {
  try {
    await connectMongoDB();
    
    const orderData = JSON.parse(event.body);
    const requiredFields = ['productId', 'quantity', 'customerName'];

    const response = await addRecord(orderData, requiredFields, 'Orders');
    return apiResponse(response);

  } catch (error) {
    log.error(`createOrder Error -> ${JSON.stringify(error)}`);
    return apiError(500, error);
  }
};

export const createOrderLambda = middy(createOrder)
  .use(authenticator())
  .use(handleErrorMiddleware());