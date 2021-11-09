// POST       /api/meet-up
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, address, description, image } = data;
    // will give connected client eventually
    let client = null;
    try {
      const DB_CONN_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
      client = await MongoClient.connect(DB_CONN_STRING);
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
