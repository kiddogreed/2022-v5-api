import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cruds extends BaseSchema {
  protected tableName = 'cruds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',50)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
