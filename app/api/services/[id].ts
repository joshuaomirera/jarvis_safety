// app/api/services/[id].ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getServiceById } from '../../../lib/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const id = req.query.id as string

    try {
        const service = await getServiceById(id)

        if (!service) {
            res.status(404).json({ error: 'Service not found' })
            return
        }

        res.status(200).json(service)
    } catch (error) {
        console.error('Error fetching service:', error)
        res.status(500).json({ error: 'Failed to fetch service' })
    }
}
