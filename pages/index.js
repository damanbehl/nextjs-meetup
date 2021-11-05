import Head from "next/head";
import getClient from "../utility/mongo-conn";
import MeetupList from "../components//meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  //Not needed anymore
  //
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a List of the seven wonders of the world"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
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
  const clientObj = await getClient();
  let meetups = null;
  if (clientObj.error) {
    console.log(
      "error while getting database client object>>>" + clientObj.error
    );
    throw new Error(
      "Error while getting database client object ",
      clientObj.error
    );
  } else {
    const client = clientObj.client;
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    meetups = await meetupsCollection.find().toArray();
    // console.log(meetups);
    client.close();
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
