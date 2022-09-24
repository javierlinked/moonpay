import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import useSWR from "swr";

import Currency from "lib/components/Currency";

export type Token = {
  id: string;
  name: string;
  symbol: string;
  supportsTestMode: boolean;
  isSupportedInUS: boolean;
  hidden?: boolean;
};

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // retrieve the list of tokens from the API
  const { data, error } = useSWR(
    "https://api.moonpay.com/v3/currencies",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Flex direction="column" justifyContent="center">
      <NextSeo title="Moonpay" />

      <h1>Supported Currencies</h1>
      {data.map((token: Token) => (
        <Currency token={token} key={token.id} />
      ))}
    </Flex>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await fetcher("https://api.moonpay.com/v3/currencies");
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       initialCurrencies: data,
//     },
//   };
// };

export default Home;
