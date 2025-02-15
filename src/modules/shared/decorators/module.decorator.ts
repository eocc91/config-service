interface ModuleOptions {
    controllers?: any[];
    providers?: any[];
}
/**
 * Module decorator. Accepts controllers and providers, providers can be a class or an object, if it is an object, 
 * the object must have a property called provide and useClass with the class to be injected. Provide must be of type abstract class
 * @param options 
 * @returns 
 */
export function Module(options: ModuleOptions) {
  return function (target: any) {    
    target.prototype.controllers = options.controllers;
    target.prototype.providers = options.providers;
  };
}

