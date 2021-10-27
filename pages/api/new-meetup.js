// POST       /api/meet-up
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, address, description, image } = data;
    // will give connected client eventually
    try {
      const client = await MongoClient.connect("dummyapi");
      const db = client.db();

      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      res.status(201).json({ message: "Message inserted!" });
    } catch (error) {
      client.close();
      console.log(error);
      res.status(500).json({ message: "500 – Internal Server Error" });
    }
  }
}

export default handler;
