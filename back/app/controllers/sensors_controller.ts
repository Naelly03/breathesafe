import Sensor from '#models/sensor'
import { createSensorValidator } from '#validators/sensor'
import type { HttpContext } from '@adonisjs/core/http'

export default class SensorsController {
    async index({ auth }: HttpContext) {
        const user = auth.user!
        await user.preload('sensors')
        return user.sensors
    }

    async store({ request, auth, response }: HttpContext) {
        try {
            const { model, status, installation_date } = await request.validateUsing(createSensorValidator)
            const user = auth.user!
            const sensor = await user.related('sensors').create({
                model,
                status,
                installation_date
            })
            return sensor
        } catch (error) {
            return response.status(400).json({ error: 'Error' })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const sensor = await Sensor.findByOrFail('id', params.id)
            return sensor
        } catch (error) {
            return response.status(404).json({ error: 'Sensor not found' })
        }
    }

    async update({ request, params, response }: HttpContext) {
        try {
            const sensor = await Sensor.findByOrFail('id', params.id)
            const { model, status, installation_date } = await request.validateUsing(createSensorValidator)
            
            sensor.merge({ model, status, installation_date })
            await sensor.save()
            
            return sensor
        } catch (error) {
            return response.status(400).json({ error: 'Unable to update sensor' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const sensor = await Sensor.findByOrFail('id', params.id)
            await sensor.delete()
            return response.status(200).json({ message: 'Sensor deleted successfully' })
        } catch (error) {
            return response.status(404).json({ error: 'Sensor not found' })
        }
    }
}
