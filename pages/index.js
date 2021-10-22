import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Index({ countries }) {
  return (
    <>
      {/* {countries?.map((country) => (
        <>{country.emoji}</>
      ))} */}
      Pending
    </>
  );
}
export async function getServerSideProps() {
  const client = new ApolloClient({
    // uri: "https://lz03d.sse.codesandbox.io/api/graphql",
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

  return { props: { countries: data.countries.slice(0, 10) } };
}
