/**
 * Decorator for GET requests in the methods of a controller class
 * @param path 
 * @returns 
 */
export function Get(path: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if (!target.routes) {
      target.routes = [];
    }
    let requestParams = [];
    if( target.requestParams ){
      requestParams = target.requestParams.get(target[methodName]);
    }
    let queryParams = [];
    if( target.queryParams ){
      queryParams = target.queryParams;
    }
    target.routes.push({ method: 'get', path, handler: target[methodName], requestParams: requestParams, queryParams: queryParams });    
  };
}