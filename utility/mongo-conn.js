import { MongoClient, ObjectId } from "mongodb";

const getClient = async () => {
  let client = {};
  try {
    const DB_CONN_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    client = await MongoClient.connect(DB_CONN_STRING);
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
