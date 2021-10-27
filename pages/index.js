import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

export default function Index({ countries }) {
  return (
    <>
      {countries?.map((country) => (
        <span key={country.id}>{country.emoji}</span>
      ))}
      <div>
        <Link href="/business">go to business page</Link>
      </div>
      <div>
        <Link href="/management">are you a marketer</Link>
      </div>
    </>
  );
}
export async function getStaticProps() {
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

  return { props: { countries: data.countries.slice(0, 100) } };
}
