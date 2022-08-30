function UserProfile(props) {
  return <h1>{props.name}</h1>;
}
export default UserProfile;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log(req);
  return {
    props: {
      name: "user-00",
    },
  };
}
