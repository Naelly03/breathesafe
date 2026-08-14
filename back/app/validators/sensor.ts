import vine from '@vinejs/vine'

export const createSensorValidator = vine.compile(
    vine.object({
        model: vine.string().trim(),
        status: vine.boolean(),
        installation_date: vine.date().optional()

    })
)

export const updateSensorValidator = vine.compile(
    vine.object({
        model: vine.string().trim(),
        status: vine.boolean(),
        installation_date: vine.date().optional()

    })
)