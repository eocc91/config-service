/**
 * Decorator for put methods in the methods of a controller class
 * @param path 
 * @returns 
 */
export function Put(path: string) {
 
    return function (target: any, methodName: string) {
      if (!target.routes) {
        target.routes = [];
      }
      let requestParams = [];
      if( target.requestParams ){
        requestParams = target.requestParams.get(target[methodName]);
      }
      let requestBody = [];
      if( target.requestBody ){
        requestBody = target.requestBody;
      }
      target.routes.push({ method: 'put', path, handler: target[methodName], requestParams: requestParams, requestBody: target.requestBody });
    };
  }