import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sensor from './sensor.js'

export default class Reading extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'co_concentration' })
  declare coConcentration : number

  @column({ columnName: 'co_level' })
  declare coLevel : string

  @column({ columnName: 'date_hour' })
  declare dateHour : DateTime

  @column()
  declare sensorId : number

  @belongsTo(()=> Sensor)
  declare sensor : BelongsTo<typeof Sensor>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

}