/**
 * Decorator to inject the request body into a controller method parameter.
 * @param paramName 
 * @returns 
 */
export function Body(paramName?: string): ParameterDecorator {
  return (target: any, propertyKey: any, parameterIndex: any) => {
    if( !target.requestBody ) {
      target.requestBody = [];
    }
    
    target.requestBody.push({paramName, parameterIndex});    
  }; 
}