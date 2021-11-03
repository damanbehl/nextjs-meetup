import { MongoClient, ObjectId } from "mongodb";

const getClient = async () => {
  let client = {};
  try {
    client = await MongoClient.connect(process.env.DB_CONN_STRING);
    return { client: client, error: null };
  } catch (error) {
    console.log("error while gettind db object mongoconn");
    return {
      client: null,
      error: error,
    };
  }
};

export default getClient;
export { ObjectId };
