/**
 * Decorator for POST methods in the methods of a controller class
 * @param path 
 * @returns 
 */
export function Post(path: string) {
    return function (target: any, methodName: string) {
      if (!target.routes) {
        target.routes = [];
      }
      let requestBody = [];
      if( target.requestBody ){
        requestBody = target.requestBody;
      }
      target.routes.push({ method: 'post', path, handler: target[methodName], requestBody: target.requestBody });
    };
  }