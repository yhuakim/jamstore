import { BaseClient } from '@xata.io/client';

export default async function handler(req, res) {
    const { visitorID } = req.body
    console.log(visitorID)

    const xata = new BaseClient({
        branch: 'main',
        apiKey: process.env.API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL
        //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
    });

    try {
        const records = await xata.db.cart
            .select(["*", "product_id.*"]).filter('user_id', visitorID)
            .getAll();

        res.status(200).json({ data: records })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
}