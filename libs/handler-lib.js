export default function handler(lambda) {
    return async function (event, context) {

      context.callbackWaitsForEmptyEventLoop = false;

      let body, statusCode;
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {
        console.log(e);
  return [500, { error: e.message }];
      }
      return {
        statusCode,
        body: JSON.stringify(body),
      };
    };
  }