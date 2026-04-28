import Reading from '#models/reading'
import Sensor from '#models/sensor'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ReadingsController {

    async store({ request, response }: HttpContext) {
        try {
          const body = request.only(['coConcentration', 'coLevel', 'sensorId'])
      
          const sensor = await Sensor.findOrFail(body.sensorId)
      
          const reading = await Reading.create({
            coConcentration: body.coConcentration,
            coLevel: body.coLevel,
            sensorId: body.sensorId,
            dateHour: DateTime.now(), // ou pode receber do body
          })
      
          await reading.preload('sensor')
      
          return response.status(201).json({
            id: reading.id,
            coConcentration: reading.coConcentration,
            coLevel: reading.coLevel,
            dateHour: reading.dateHour,
            sensor: {
              id: reading.sensor.id,
              model: reading.sensor.model,
              status: reading.sensor.status,
            },
          })
        } catch (error) {
          return response.status(400).json({
            error: 'Unable to create reading',
            details: error.message,
          })
        }
      }
      
   
    async index({ response }: HttpContext) {
        try {
            const readings = await Reading.query().preload('sensor')
            return readings.map(reading => ({
                id: reading.id,
                coConcentration: reading.coConcentration,
                coLevel: reading.coLevel,
                dateHour: reading.dateHour,
                created_at: reading.createdAt,
                sensor: {
                    id: reading.sensor.id,
                    model: reading.sensor.model,
                    status: reading.sensor.status
                }
            }))
        } catch (error) {
            return response.status(400).json({ error: 'Unable to fetch readings' })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const reading = await Reading.findByOrFail('id', params.id)
            await reading.preload('sensor')
            return {
                id: reading.id,
                coConcentration: reading.coConcentration,
                coLevel: reading.coLevel,
                dateHour: reading.dateHour,
                created_at: reading.createdAt,
                sensor: {
                    id: reading.sensor.id,
                    model: reading.sensor.model,
                    status: reading.sensor.status
                }
            }
        } catch (error) {
            return response.status(404).json({ error: 'Reading not found' })
        }
    }

    async latest({ params, response }: HttpContext) {
        try {
            const reading = await Reading.query()
                .where('sensor_id', params.sensor_id)
                .orderBy('created_at', 'desc')
                .preload('sensor')
                .firstOrFail()
            
            return {
                id: reading.id,
                coConcentration: reading.coConcentration,
                coLevel: reading.coLevel,
                dateHour: reading.dateHour,
                created_at: reading.createdAt,
                sensor: {
                    id: reading.sensor.id,
                    model: reading.sensor.model,
                    status: reading.sensor.status
                }
            }
        } catch (error) {
            return response.status(404).json({ error: 'No readings found for this sensor' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const reading = await Reading.findByOrFail('id', params.id)
            await reading.delete()
            return response.status(200).json({ message: 'Reading deleted successfully' })
        } catch (error) {
            return response.status(404).json({ error: 'Reading not found' })
        }
    }
}
