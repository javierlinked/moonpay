import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import useSWR from "swr";

import Currency from "lib/components/Currency";

export type Token = {
  id: string;
  name: string;
  code: string;
  supportsTestMode: boolean;
  isSupportedInUS: boolean;
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

  // grid-template-columns: repeat(3, 1fr);
  // grid-auto-rows: 1fr;

  return (
    <Flex
      display="grid"
      maxWidth="800px"
      gridTemplateColumns="repeat(3, 1fr)"
      gridAutoRows="1fr"
    >
      <NextSeo title="Moonpay" />
      <h1>Supported Currencies</h1>
      {data.map((token: Token) => (
        <Currency token={token} key={token.id} />
      ))}
    </Flex>
  );
};

export default Home;
