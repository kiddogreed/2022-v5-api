import test from 'japa'
import Crud from 'App/Models/Crud'


const BASE_URL = `http://127.0.0.1:3333`
const testid = 1
const testname = 'testname'
test.group('http request', () => {

  test('base URL',(assert)=>{
    assert.equal('http://127.0.0.1:3333',BASE_URL)
  })


  test('GET INDEX /crud', async (assert) => {
    const crud = await Crud.all()
    const data = {data:crud}
    assert.equal(crud, data.data)
  })

  test(`GET SHOW /crud/${testid}`, async (assert) => {
    const crud = await Crud.find(testid)
    const data = {data:crud}
    assert.equal(crud, data.data)
  })

  test(`POST CREATE /crud`, async (assert) => {
    const crud =  await Crud.create({
      name:testname
    })
    assert.equal(crud.name, testname)
  })

  test(`PUT UPDATE /crud/${testid}`, async (assert) => {
    const update = await Crud.find(testid)
    update!.name = testname
    update!.save()
    assert.equal(update!.name ,testname)   
  })

  test(`DELETE DESTROY /crud/${testid}`, async (assert) => {
    const crud = await Crud.find(testid)
    crud!.delete() 
    assert.equal(crud!.id ,testid)
  })


})