import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

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
  const token: Token = {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    supportsTestMode: true,
    isSupportedInUS: true,
  };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
      border="1px solid"
    >
      <NextSeo title="Home" />
      <Currency token={token} />
    </Flex>
  );
};

export default Home;
