/**
 * Decorator for query params in the request object
 * @param paramName 
 * @returns 
 */
export function QueryParams(paramName?: string): ParameterDecorator {
  return (target: any, propertyKey: any, parameterIndex: any) => {
    if( !target.queryParams ) {
      target.queryParams = [];
    }
    
    target.queryParams.push({paramName, parameterIndex});    
  };
}