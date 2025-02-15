/**
 * @Description Delete decorator, accepts query params and request params
 * @param path 
 * @returns 
 */
export function Delete(path: string) {
  return function (target: any, methodName: string) {
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
    target.routes.push({ method: 'delete', path, handler: target[methodName], requestParams: requestParams, queryParams: queryParams });
  };
}