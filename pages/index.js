// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components//meetups/MeetupList";

function HomePage(props) {
  //Not needed anymore
  //
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   //req is what we got and res is what we will return
//   //req gives access to session cookie, useful to check if user is logged in
//   const req = context.req;
//   const res = context.res;
//   //fetch data from API or access file system
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data from API
  let client = null;
  let meetups = null;
  try {
    client = await MongoClient.connect(
      "DUMMY_DB_URL"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    meetups = await meetupsCollection.find().toArray();
  } catch (error) {
    // client.close();
    console.log(error);
  } finally {
    if (client) {
      client.close();
    }
  }
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
