import "reflect-metadata";

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
    // let container = new Container();
    // for( const provider of options.providers!) {
    //   if (typeof provider === 'object') {
    //     container.register(provider.provide, new provider.useClass());
        
    //   } else {
    //     container.register(provider, new provider());
    //     const paramTypes = Reflect.getMetadata("design:paramtypes", provider);

    //     console.log("Tipos detectados en el constructor de UserUseCase:");
    //     if (paramTypes) {
    //         paramTypes.forEach((type: any, index: number) => {
    //             console.log(`Parámetro ${index}: ${type.name}`);
    //         });
    //     } else {
    //         console.log("No se detectaron metadatos.");
    //     }
    //     // console.log(Reflect.getMetadata("design:paramtypes", provider));
    //   }
    // }
    
    target.prototype.controllers = options.controllers;
    target.prototype.providers = options.providers;
  };
}


class Container {
  private registry = new Map<string | symbol, any>();

  register<T>(token: string | symbol, implementation: T): void {
      this.registry.set(token, implementation);
  }

  resolve<T>(token: string | symbol): T {
      const implementation = this.registry.get(token);
      if (!implementation) {
          throw new Error(`No se encontró la implementación para el token: ${String(token)}`);
      }
      return implementation;
  }
}