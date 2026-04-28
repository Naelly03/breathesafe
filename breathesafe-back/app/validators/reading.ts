import vine from '@vinejs/vine'

export const createReadingValidator = vine.compile(
    vine.object({
        co_concentration: vine.number(),
        co_level: vine.string().trim(),
        date_hour: vine.date()

    })
)

