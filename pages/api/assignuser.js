// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BaseClient } from '@xata.io/client';
export default async function handler(req, res) {
  const { visitorID } = req.body
  //console.log(body)

  const xata = new BaseClient({
    branch: 'main',
    apiKey: process.env.API_KEY,
    databaseURL: process.env.XATA_DATABASE_URL
    //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
  });

  try {
    //Fetch all users and find a match for the visitorID
    const records = await xata.db.anon_user.select(["*"]).filter("id", visitorID).getAll()

    //if a match is not found, create a user with the visitorID
    if (records.length === 0) {
      await xata.db.anon_user.create(visitorID, {
        _id: visitorID
      })
    }

    res.status(200)
  } catch (err) {
    console.error(err)
  }
}
