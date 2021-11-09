import MeetupDetail from "../../components/meetups/MeetupDetail";
import getClient, { ObjectId } from "../../utility/mongo-conn";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails({ meetupData }) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        address={meetupData.address}
        title={meetupData.title}
        description={meetupData.description}
        image={meetupData.image}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // get most frequent or all products or page params you might need
  const clientObj = await getClient();
  let meetups;
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
    meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
  }
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup
  const meetupId = context.params.meetupId;

  const clientObj = await getClient();
  let selectedMeetup;
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
    selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    });
    client.close();
  }
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
