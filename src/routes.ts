import {Express, Request, Response} from 'express'
import { createUserHandler, createUserSessionHandler } from './controller/user.controller'

import validateRequest from './middleware/validateRequest'
import { createUserSchema, createUserSessionSchema } from './schema/userSchema'

export default function(app: Express){
    app.get("/", (req:Request, res:Response)=>{
        res.json({message: "Hello"})
    })

    app.post('/api/user', validateRequest(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler)
}