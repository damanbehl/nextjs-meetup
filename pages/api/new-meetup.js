// POST       /api/meet-up
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, address, description, image } = data;
    // will give connected client eventually
    let client = null;
    try {
      client = await MongoClient.connect(
        "DUMMY_URL"
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      res.status(201).json({ message: "Message inserted!" });
    } catch (error) {
      // client.close();
      console.log(error);
      res.status(500).json({ message: "500 – Internal Server Error" });
    } finally {
      if (client) {
        client.close();
      }
    }
  }
}

export default handler;
