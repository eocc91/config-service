import "reflect-metadata";
import express, {Request, Response } from "express";

type Injectable = {
    provide?: any;
    useClass: any;
    injectables?: any[];
    useFactory?: any;
  };
  
  function resolveDependencies(providers: Injectable[]) {
    const resolved = new Map(); // Contenedor para almacenar las instancias resueltas
  
    function resolve(provider: Injectable): any {
      const key = provider.provide || provider.useClass;
  
      // Si ya está resuelto, devuelve la instancia almacenada
      if (resolved.has(key)) {
        return resolved.get(key);
      }
  
      // Si el proveedor tiene `useFactory`, ejecuta la función para obtener la instancia
      if (provider.useFactory) {
        // Resuelve las dependencias de la fábrica, si las hay
        const dependencies = (provider.injectables || []).map((injectable) => {
          const dependencyProvider = providers.find(
            (p) => p.provide === injectable || p.useClass === injectable
          );
  
          if (!dependencyProvider) {
            throw new Error(`No provider found for dependency: ${injectable.name}`);
          }
  
          return resolve(dependencyProvider); // Resuelve la dependencia recursivamente
        });
        const instance = provider.useFactory(...dependencies);
        console.log(instance.isInitialized); 
        resolved.set(key, instance); // Almacena la instancia resuelta
        return instance;
      }
  
      // Si no tiene `useFactory`, utiliza `useClass` para crear la instancia
      const dependencies = (provider.injectables || []).map((injectable) => {
        const dependencyProvider = providers.find(
          (p) => p.provide === injectable || p.useClass === injectable
        );
  
        if (!dependencyProvider) {
          throw new Error(`No provider found for dependency: ${injectable.name}`);
        }
  
        return resolve(dependencyProvider); // Resuelve la dependencia recursivamente
      });
  
      // Crea la instancia de la clase con sus dependencias resueltas
      const instance = new provider.useClass(...dependencies);
  
      // Almacena la instancia resuelta en el contenedor
      resolved.set(key, instance);
  
      return instance;
    }
  
    // Itera sobre todos los proveedores y resuelve sus instancias
    for (const provider of providers) {
      const key = provider.provide || provider.useClass;
      if (!resolved.has(key)) {
        const instance = resolve(provider);
        // console.log(`Resolved instance: ${provider.useClass?.name || provider.provide?.name}`, instance);
      }
    }
  
    return resolved; // Retorna el contenedor con todas las instancias resueltas
  }
  
  

export async function registerModules(app: express.Application, modules: any[]) {
    try {
        for( const moduleClass of modules) {
            const module = new moduleClass();
 
            const container = resolveDependencies(module.providers)        
            for(const controller of module.controllers) {
                const paramTypes = Reflect.getMetadata("design:paramtypes", controller) || [];
                // Resolver dependencias desde providers
                const dependencies = paramTypes.map((dep: any) => {                
                    if (container.has(dep)) {
                        return container.get(dep);
                    }
                    // console.error(`❌ Error: No se encontró un provider para ${dep}`);
                    return null;
                });
    
                // Si alguna dependencia no se encontró, lanzar error 
                if (dependencies.includes(null)) {
                    // throw new Error(`🚨 No se pueden resolver todas las dependencias de ${controller.name}`);
                }
                
                const controllerInstance = new controller(...dependencies);            
                const baseRoute = controllerInstance.route;
                
                // Definimos las rutas usando los métodos decorados
                if (controllerInstance.routes) {
                    controllerInstance.routes.forEach((route: any) => {
                        const dynamicRoute: keyof express.Application = route.method;                                        
                        app[dynamicRoute](baseRoute + route.path, async (req: Request, res: Response) => {
                            const args: any[] = [];                        
                            if( route.requestParams ){
                                route.requestParams.forEach((param: any) => {                                
                                    args[param.parameterIndex] = param.paramName
                                        ? req.params[param.paramName]
                                        : req.params;
                                });
                            }
    
                            if (route.requestBody) {                            
                                route.requestBody.forEach((bodyParam: any) => {
                                    args[bodyParam.parameterIndex] = bodyParam.paramName
                                    ? req.body[bodyParam.paramName]
                                    : req.body;
                                });
                            }
    
                            if (route.queryParams) {                            
                                route.queryParams.forEach((bodyParam: any) => {
                                    args[bodyParam.parameterIndex] = bodyParam.paramName
                                    ? req.query[bodyParam.paramName]
                                    : req.query;
                                });
                            }
                            const result = await controllerInstance[route.handler.name](...args);
                            res.json(result);
                        });
                                           
                    });
                }
            }
            
        }
    } catch (error) {
        console.log(error);
        
    }
    
}



