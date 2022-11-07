import { BaseClient } from '@xata.io/client';

export default async function handler(req, res) {
    const { visitorID, quantity, amount, product_id } = req.body

    const xata = new BaseClient({
        branch: 'main',
        apiKey: process.env.API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL
        //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
    });

    try {
        // Fetch all cart items and filter by visitorID. This returns items added by given visitorID
        const records = await xata.db.cart
            .select(["*", "product_id.*"])
            .filter("user_id", visitorID)
            .getAll();

        //Map through the cart items and return only an array of the product ids
        const products = records.map((prod) => prod.product_id.id)

        //Check if the requested product exists in the cart
        const productExists = products.filter((product) => product === product_id)

        // if product doesn't exist, create a new record
        if (productExists.length === 0) {
            await xata.db.cart.create(product_id, {
                quantity,
                amount,
                user_id: visitorID,
                product_id
            })

            res.status(200).json({ message: "item added successfully" })

        }
        // if it exists, update the record with the new quantity and amount
        else {
            await xata.db.cart.update(product_id, {
                quantity,
                amount,
            })

            res.status(200).json({ message: "item updated successfully" })

        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `${err.message}` })
    }
}