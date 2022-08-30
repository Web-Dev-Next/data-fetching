function UserProfile(props) {
  return <h1>{props.name}</h1>;
}
export default UserProfile;

export async function getServerSideProps(context) {
  console.log("UserProfile: Run on Server Side");
  const { params, req, res } = context;
  return {
    props: {
      name: "user-00",
    },
  };
}
