export function Injection(options: any) {
  return function (target: any) {   
    // for( const provider of options.providers!) {
    //   if (typeof provider === 'object') {

    //   } else {
    //     console.log(Reflect.getMetadata("design:paramtypes", provider));
    //   }
    // }
    // target.prototype.controllers = options.controllers;
    // target.prototype.providers = options.providers;
  };
}