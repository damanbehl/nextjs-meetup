import { MongoClient, ObjectId } from "mongodb";

const getClient = async () => {
  let client = {};
  try {
    client = await MongoClient.connect(
      "DUMMY_URL"
    );
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
