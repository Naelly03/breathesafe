import Reading from '#models/reading'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Reading.createMany([
      {
        coConcentration: 400.00,
        coLevel: "Bom",
        dateHour: DateTime.now(),
        sensorId: 1
      },
      {
        coConcentration: 800.00,
        coLevel: "Moderado",
        dateHour: DateTime.now(),
        sensorId: 2
        
      }
    ])
  }
}