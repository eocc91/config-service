import "reflect-metadata";
import express, {Request, Response } from "express";

export  function registerModules(app: express.Application, modules: any[]) {
    let providers = new Map();
    for( const moduleClass of modules) {
        const module = new moduleClass();

        // Registrar providers en un mapa para resolver dependencias automáticamente        
        for (const provider of module.providers) {            
            if (typeof provider === 'object') {
                providers.set(provider.provide, new provider.useClass());
             
            }else {
                providers.set(provider, new provider());
            }
        }        
        for( let provider of module.providers) {
            const paramTypes = Reflect.getMetadata("design:paramtypes", provider) || [];            
            const dependencies = paramTypes.map((dep: any) => {                
                if (providers.has(dep)) {
                    return providers.get(dep);
                }
                console.error(`❌ Error: No se encontró un provider para ${dep}`);
                return null;
            });

            // Si alguna dependencia no se encontró, lanzar error
            if (dependencies.includes(null)) {
                throw new Error(`🚨 No se pueden resolver todas las dependencias de ${provider.name}`);
            }

            if( dependencies.length ) {
                providers.set(provider, new provider(...dependencies));
            }
        }
        for(const controller of module.controllers) {
            const paramTypes = Reflect.getMetadata("design:paramtypes", controller) || [];
            // Resolver dependencias desde providers
            const dependencies = paramTypes.map((dep: any) => {                
                if (providers.has(dep)) {
                    return providers.get(dep);
                }
                console.error(`❌ Error: No se encontró un provider para ${dep}`);
                return null;
            });

            // Si alguna dependencia no se encontró, lanzar error
            if (dependencies.includes(null)) {
                throw new Error(`🚨 No se pueden resolver todas las dependencias de ${controller.name}`);
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
}



