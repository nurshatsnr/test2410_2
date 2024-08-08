import {log} from './logger';
import {currentDateTime} from '../constants';
import {validateRequestFields} from "./validateUtils";
import {connectMongoDB} from './mongoDB/dbConnector';

export const addRecord = async (recordObj, requiredFields, tableName) => {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = await validateRequestFields(
            recordObj,
            requiredFields
        );
        if (validationResponse === true) {
            log.debug(`params -> ${JSON.stringify(recordObj)}`);
            const data = await tableName.insertMany(recordObj);
            log.debug(`data -> ${JSON.stringify(data)}`);
            response = { 'body': data, 'statusCode': '200' }
            log.debug(`response ${JSON.stringify(response)}`)
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'INSERT_FAILED', 'description': validationResponse, 'statusCode': '501' };
            return response;
        }
    } catch (error) {
        log.debug(`addNewReceiverInfo|error -> ${JSON.stringify(error)}`);
        response = { 'body': 'INSERT_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }

};

export const addBatchRecord = async (recordObj, requiredFields, tableName) => {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = await validateRequestFields(
            recordObj,
            requiredFields
        );
        if (validationResponse === true) {
            log.debug(`params -> ${JSON.stringify(recordObj)}`);
            const data = await tableName.insertMany(recordObj, { ordered: false });
            log.debug(`data -> ${JSON.stringify(data)}`);
            response = { 'body': data, 'statusCode': '200' }
            log.debug(`response ${JSON.stringify(response)}`)
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'INSERT_FAILED', 'description': validationResponse, 'statusCode': '501' };
            return response;
        }
    } catch (error) {
        log.debug(`addNewReceiverInfo|error -> ${JSON.stringify(error)}`);
        response = { 'body': 'INSERT_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }
};

export async function updateRecord(recordObj, requiredFields, params, tableName) {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = await validateRequestFields(
            recordObj,
            requiredFields
        );
        if (validationResponse === true) {
            log.debug(`params -> ${JSON.stringify(params)}`);
            let data = await tableName.findOneAndUpdate(params, recordObj, { new : true });
            log.debug(`data is ${JSON.stringify(data)}`);
            response = { 'body': data, 'statusCode': '200' }
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'UPDATE_FAILED', 'description': validationResponse, 'statusCode': '501' };
            return response;
        }

    } catch (error) {
        log.debug(`updateRecord| error -> ${JSON.stringify(error)}`);
        response = { 'body': 'UPDATE_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }
}

export async function getRecord(recordObj, requiredFields, params, tableName, limit = 0, skip = 0) {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = await validateRequestFields(
            recordObj,
            requiredFields
        );
        log.debug(`validationResponse -> ${validationResponse}`);
        if (validationResponse === true) {
            log.debug(`params -> ${JSON.stringify(params)}`);
            let query = tableName.find(params);
            if (limit > 0) {
                query = query.limit(limit);
            }
            if (skip > 0) {
                query = query.skip(skip);
            }
            const dataResponse = await query;
            log.debug(`data is waiting.....`);
            log.debug(`data is ${JSON.stringify(dataResponse)}`);
            response = { 'body': dataResponse, 'statusCode': '200' };
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'GET_FAILED', 'description': validationResponse, 'statusCode': '501' };

            return response;
        }
    } catch (error) {
        log.debug(`here............errorrrrrr ${error}`);
        log.debug(`getRecord|  error -> ${JSON.stringify(error)}`);
        response = { 'body': 'GET_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }
}

export const getPaginatedRecord = async (recordObj, requiredFields, params, options,  tableName) => {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = await validateRequestFields(
            recordObj,
            requiredFields
        );
        log.debug(`validationResponse -> ${validationResponse}`);
        if (validationResponse === true) {
            log.debug(`params -> ${JSON.stringify(params)}`);
            log.debug(`table name -> ${tableName}`);
            let dataResponse = await tableName.paginate(params, options);
            log.debug(`data is waiting.....`);
            log.debug(`data is ${JSON.stringify(dataResponse)}`);
            let paginationResult = {
                currentPage: dataResponse.page,
                totalPages: dataResponse.totalPages,
                totalCount: dataResponse.totalDocs,
                limit: dataResponse.limit
            }
            response = { 'body': dataResponse.docs, 'statusCode': '200', pagination: paginationResult };
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'GET_FAILED', 'description': validationResponse, 'statusCode': '501' };

            return response;
        }
    } catch (error) {
        log.debug("here............error");
        log.debug(`here............error ${error}`);
        log.debug(`getRecord|  error -> ${JSON.stringify(error)}`);
        response = { 'body': 'GET_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }
}

export const deleteRecord = async (recordObj, requiredFields, params, tableName) => {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = validateRequestFields(recordObj, requiredFields);

        if (validationResponse === true) {
            log.debug(`delete params -> ${JSON.stringify(params)}`);
            const data = await tableName.findOneAndUpdate(params, { expiryDate: currentDateTime() });
            log.debug(`delete response is ${JSON.stringify(data)}`);
            params.$and = params.$and.filter(obj => !obj.expiryDate);
            log.debug(`delete params after pop expiryDate -> ${JSON.stringify(params)}`);
            let getResponse = await tableName.findOne(params);
            log.debug(`getResponse ${JSON.stringify(getResponse)}`);
            response = { 'body': getResponse, 'statusCode': '200' }
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'DELETE_FAILED', 'description': validationResponse, 'statusCode': '501' };
            return response;
        }

    } catch (error) {
        log.debug(`deleteRecord| error -> ${JSON.stringify(error)}`);
        response = { 'body': 'DELETE_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }
}

export const deleteBatchRecords = async (recordObj, requiredFields, params, tableName) => {
    let response = {};
    try {
        await connectMongoDB();
        const validationResponse = validateRequestFields(recordObj, requiredFields);

        if (validationResponse === true) {
            log.debug(`delete params -> ${JSON.stringify(params)}`);
            const data = await tableName.deleteMany(params);
            log.debug(`delete response is ${JSON.stringify(data)}`);
            response = { 'body': data, 'statusCode': '200' }
            return response;
        } else {
            log.debug(`Required data is missing ${validationResponse}`);
            response = { 'body': 'DELETE_FAILED', 'description': validationResponse, 'statusCode': '501' };
            return response;
        }

    } catch (error) {
        log.debug(`deleteRecord| error -> ${JSON.stringify(error)}`);
        response = { 'body': 'DELETE_FAILED', 'description': error, 'statusCode': '500' }
        return response;
    }
}
