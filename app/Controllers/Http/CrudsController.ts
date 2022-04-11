import Crud from 'App/Models/Crud'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
export default class CrudsController {
  
  public async index({response,request}:HttpContextContract){
    const meta = request.only(["page", "per_page"]);
    const data = await Crud.query().orderBy('id','desc')
    .paginate(meta.page, meta.per_page)
 
    return response.ok({
      message:"ok",
      data:data
    })
  }

  public async show({params, response}:HttpContextContract){
    const crudID = await Crud.findOrFail(params.id)
    return response.ok({
      message:'ok',
      data:crudID
    })
  }

  public async store({request,response}:HttpContextContract){
    const validated = schema.create({
      name: schema.string({trim:true})
      })

      const payload = await request.validate({schema:validated})
   // const validname = await request.validate(CrudValidator)
  
    await Crud.create({
      name: payload.name
    })

    return response.created({
      message: 'data created',
      data: {name:payload.name}
      })
  }

  public async update({params,request, response}:HttpContextContract){

    const idInput = request.input('name')
    const crud = await Crud.findOrFail(params.id)
    crud.name = idInput
    crud.save()

    return response.ok({
      message:'update succesfully',
      data:{modified_to:idInput}
    })
   
  }

  public async destroy({params,response}:HttpContextContract){
    const crud = await Crud.findOrFail(params.id)
    crud.delete()
    return response.accepted({
      message:'DELETE succesfully',
      data:{'delete data id':params.id}
      })
  
  }

}
