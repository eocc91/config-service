/**
 * Decorator for request params in the request object
 * @param paramName 
 * @returns 
 */
export function RequestParams(paramName?: string): ParameterDecorator {
  return (target: any, propertyKey: any, parameterIndex: any) => {
      if( !target.requestParams ) {
          target.requestParams = new Map<any, any>();
        }
        if(  !target.requestParams.get(target[propertyKey]) ){
            target.requestParams.set(target[propertyKey], []);
        }        

        target.requestParams.get(target[propertyKey]).push({ paramName, parameterIndex });

  };
}
