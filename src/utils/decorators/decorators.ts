import { ValidationChain, validationResult } from 'express-validator';
import { body } from 'express-validator';
import { interfaces } from 'inversify-express-utils';
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
            fields.map((f)=>{
                f(req, res, next)
            })
            return originalMethod.bind(this)   
            // await Promise.all(fields.map(validation => validation.run(req)));
            // const errors = validationResult(req).formatWith(errorFormatter);
            // if (errors.isEmpty()) {
            //     args.next()
                
            //     // args.next()
            // }else{
            //     res.status(400).json({ errors: errors.array() });   
            // }
            
        }
        
    }
}