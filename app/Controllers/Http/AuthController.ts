
import User from "App/Models/User"
import LoginValidator from "App/Validators/LoginValidator"
import RegisterValidator from "App/Validators/RegisterValidator"

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({request, response, auth}:HttpContextContract){

    const data = request.only([
      'email',
      'password',
   
    ])

    
    await request.validate(LoginValidator)
    const user = await User.query()
    .where('email', data.email)
    .first()

    if (!user) {
      return response.notFound({"message":"There is no existing user with that email."})
    }


    try {
      const access = await auth.use('api').attempt(data.email, data.password, {
        expiresIn: '1days'
      })

     
     
      return response.ok({
        "message":'You are now logged in.',
        'token': access.token,
        'user': {
          'id': user.id,
          'plan_id': 'COMING SOON',
          'created at':user.createdAt
        }
      })
    } catch (error) {
      return response.unauthorized({message:"Invalid username or password."});
    }
  }

  public async register({ auth, request, response }:HttpContextContract) {
   
   const validInput = await request.validate(RegisterValidator)
    
    const email = validInput.email
    const pass  = validInput.password
    
    try {
     
    
      const user = await User.create({
        email: email,
        password: pass,
        
      })
      const token = await auth.use('api').generate(user)
    
    
      return response.ok({
        "message":'You are now Registed.',
        'token': token,
        'email': user.email,
        'password': user.password,
      }, )
    } catch (e) {
      return response.badRequest({message:'Invalid Verified Request'})
    }
  }
}
