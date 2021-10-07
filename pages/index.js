import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Index({ users }) {
  return (
    <>
      {/* {users?.map((user) => (
        <>{user.emoji}</>
      ))} */}
      Pending
    </>
  );
}
export async function getServerSideProps() {
  const client = new ApolloClient({
    // uri: "https://royo3.sse.codesandbox.io/api/graphql",
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          emoji
        }
      }
    `
  });

  return { props: { users: data.countries.slice(0, 10) } };
}
