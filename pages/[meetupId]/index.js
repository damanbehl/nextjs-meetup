import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData }) {
  return (
    <MeetupDetail
      address={meetupData.address}
      title={meetupData.title}
      description={meetupData.description}
      image={meetupData.image}
    />
  );
}

export async function getStaticPaths(context) {
  // get most frequent or all products or page params you might need
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup
  const meetupId = context.params.meetupId;

  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/1280px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg",
        title: "Agra visit",
        address: "Agra",
        description: "our first meetup",
      },
    },
  };
}

export default MeetupDetails;
