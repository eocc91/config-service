import "reflect-metadata";
/**
 * Decorator for controller classes in the application
 * @param route 
 * @returns 
 */
export function Controller(route: string) {
  return function (target: any) {
    if (!target.routes) {
      target.routes = [];
    }
    target.prototype.route = route; // Añadimos la ruta base a la clase
  };
}