import { BaseClient } from '@xata.io/client';

export default async function handler(req, res) {
    const { visitorID, quantity, amount, product_id } = req.body
    console.log(visitorID, quantity, amount, product_id)

    const xata = new BaseClient({
        branch: 'main',
        apiKey: process.env.API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL
        //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
    });

    try {

        const records = await xata.db.cart
            .select(["*", "product_id.*"])
            .filter("user_id", visitorID)
            .getAll();

        const products = records.map((prod) => prod.product_id.id)
        const productExists = products.filter((product) => product === product_id)
        /* if (productExists.length === 0) {
            await xata.db.cart.create({
                quantity,
                amount,
                user_id: visitorID,
                product_id
            })
        } */

        const id = productExists && productExists[0]
        await xata.db.cart.createOrUpdate(id, {
            quantity,
            amount,
            user_id: visitorID,
            product_id
        })

        /* if (!productExists && productExists.length === 0) {
            await xata.db.cart.create({
                quantity,
                amount,
                user_id: visitorID,
                product_id
            })
        }
         */

        console.log(records, productExists, id)

        /* const record = await xata.db.cart.read(visitorID)
        console.log(record);
        if (record == null) {
            await xata.db.cart.create(visitorID, {
                user: visitorID,
                products: productID,
                quantity: quantity,
                
            })
        } */

        //console.log(page.records)
        res.status(200).json({ records })
    } catch (err) {
        console.error(err)
    }
}