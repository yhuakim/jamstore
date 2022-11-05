// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BaseClient } from '@xata.io/client';
export default async function handler(req, res) {
  const body = req.body
  console.log(body)

  const xata = new BaseClient({
    branch: 'main',
    apiKey: process.env.API_KEY,
    databaseURL: 'https://yhuakims-rtl9qu.xata.sh/db/hackthon'
    //fetch: fetchImplementation // Required if your runtime doesn't provide a global `fetch` function.
  });

  try {
    const record = await xata.db.anon_user.read(body.visitorID)
    console.log(record);
    if (record == null) {
      await xata.db.anon_user.create(body.visitorID, {
        _id: body.visitorID
      })
    }

    //console.log(page.records)
    res.status(200).json({ data: record })
  } catch (err) {
    console.error(err)
  }
}
