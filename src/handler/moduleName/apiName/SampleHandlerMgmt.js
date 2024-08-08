import { connectDatabase } from "../../../../database/db";
import { apiError, apiResponse } from "../../../commons/http-helpers/api-response";
import { log } from "../../../commons/utils/logger";
import middy from 'middy';
import {
  authenticator,
  handleErrorMiddleware,
} from "../../../commons/middlewares/middlewares";

export const Hello = async (record) => {
  try {
    let response = {
      message: 'Hello'
    };
    log.debug(`response:${JSON.stringify(response)}`)
    return apiResponse(response);

  } catch (error) {
    log.debug(`Create Comment Error Response -> ${JSON.stringify(error)}`);
    return apiError(500, error);
  }
};


export const checkStatus = async (record) => {
    try {
      let response = {
        message: 'All Okay'
      };
      log.debug(`response:${JSON.stringify(response)}`)
      return apiResponse(response);
  
    } catch (error) {
      log.debug(`Create Comment Error Response -> ${JSON.stringify(error)}`);
      return apiError(500, error);
    }
  };


export const sampleLambda = middy(Hello)
  .use(authenticator())
  .use(handleErrorMiddleware());

export const checkStatusLambda = middy(checkStatus)
//   .use(authenticator())
  .use(handleErrorMiddleware());