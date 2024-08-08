/**
 * Configuration Object that contains environment specific variables.
 *
 */
export const AppConfig = {
  REGION: process.env.region,
  environment: process.env.ENVIRONMENT,
  AWS_SECRET_KEY_ID: process.env.AWS_SECRET_KEY_ID,
  AWS_SECRET_KEY_VAL: process.env.AWS_SECRET_KEY_VAL,
  logLevel: process.env.LOG_LEVEL || 'info',
  requestRetryAttemptCount: process.env.REQUEST_RETRY_ATTEMPT_COUNT,
  requestRetryAttemptDelay: process.env.REQUEST_RETRY_ATTEMPT_DELAY,
  requestTimeout: process.env.REQUEST_TIMEOUT,
  AUTH_URL: process.env.AUTH_URL,
  AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
  X_API_KEY: process.env.X_API_KEY,
  SECRET_KEY_ACCESS_TOKEN: process.env.SECRET_KEY_ACCESS_TOKEN,
  SECRET_KEY_REFRESH_TOKEN: process.env.SECRET_KEY_REFRESH_TOKEN,
  API_RESPONSE: {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
  },
  MONGO_DB: process.env.MONGO_DB,
  SNS_UPDATE_WORKSPACE_DASHBOARD:`arn:aws:sns:${process.env.region}:${process.env.ACCOUNT_ID}:${process.env.PJ_PREFIX}-${process.env.env}-${process.env.SNS_UPDATE_WORKSPACE_DASHBOARD}`,
  DBT_COMMENT_REACTIONS: `${process.env.APP_PREFIX}-${process.env.env}-${process.env.DBT_COMMENT_REACTIONS}`,
  DBT_COMMENTS: `${process.env.APP_PREFIX}-${process.env.env}-${process.env.DBT_COMMENTS}`,
};

  /**
   * Environment constants.  Can be utilized to write environment specific logic.
   */
export const Environment = {
    DEV: 'dev',
    TEST: 'test',
    QA: 'qa',
    PROD: 'prod',
    LOCAL: 'local'
    };

  export const httpStatusCodes = {
    BAD_REQUEST: '400',
    INTERNAL_SERVER_ERROR: '500',
    SUCCESS: '200',
    CREATED: '201',
    NOT_FOUND:'404'
  };

