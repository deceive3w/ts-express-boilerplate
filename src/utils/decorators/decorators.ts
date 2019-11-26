import { ValidationChain, validationResult } from 'express-validator';
import { body } from 'express-validator';
import { interfaces, httpMethod } from 'inversify-express-utils';
import Layer from 'express/lib/router/layer'
const handle_request = Layer.prototype.handle_request;
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `message: ${msg}`;
};

export const validator = ( fields: ValidationChain[])=>{
    return (target: any, key: string, descriptor: any)=>{
        let originalMethod = descriptor.value
        descriptor.value = async function (args){
            
            const res = args['res']
            const req = args['res']['req']
            const next = args['next']
            const method = Object.keys(req.route.methods)[0]
            httpMethod.apply(void 0, [method, req.url].concat(fields))
            // console.log(res)
            // let handle = function(req, res,next){
            //     console.log("middleware")
            //     let result = handle.apply(this,args)
            //     return result
            // }
            // handle_request.apply(this, args)
            // return originalMethod.bind(this)   
            // await Promise.all(fields.map(validation => validation.run(req)));
            // const errors = validationResult(req).formatWith(errorFormatter);
            // console.log(errors)
            // if (errors.isEmpty()) {
            //     args.next()
            // }else{
            //     res.status(400).json({ errors: errors.array() });   
            // }
            // return originalMethod.bind(this)
        }
        return descriptor.value
    }
}