import { Flex, Button, useBoolean } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import Currency from "lib/components/Currency";
import { sortArrayOfObjects } from "lib/types/functions";

export type Token = {
  id: string;
  name: string;
  code: string;
  supportsTestMode: boolean;
  isSupportedInUS: boolean;
};

// const Home: NextPage<{ initialCurrencies: MoonPayCurrency[] }> = ({
//   initialCurrencies,
// }) => {
//   const [currencies, setCurrencies] =
//     useState<MoonPayCurrency[]>(initialCurrencies);

//   const [toggleSupportedInUs, setToggleSupportedInUs] = useState(false);
//   const [toggleSupportsTestMode, setToggleSupportsTestMode] = useState(false);

const Home = () => {
  const [tokens, setTokens] = useState<Token[]>([]);

  const [supportedInUs, setSupportedInUs] = useBoolean(false);
  const [supportsTestMode, setSupportsTestMode] = useBoolean(false);

  useEffect(() => {
    fetch("https://api.moonpay.com/v3/currencies")
      .then((response) => response.json())
      .then((data) => setTokens(data));
  }, []);

  const sortBy = (key: keyof Token) => {
    const sorted = sortArrayOfObjects(tokens, key, "ascending");
    setTokens([...sorted]);
  };

  const shuffle = () => {
    const shuffled = [...tokens].sort(() => 0.5 - Math.random());
    setTokens(shuffled);
  };

  // useEffect(() => {
  //   // const filteredCurrencies = currencies.map((currency) => {
  //   //   const filterUs = toggleSupportedInUs && !currency.isSupportedInUS;
  //   //   const filterTestMode =
  //   //     toggleSupportsTestMode && !currency.supportsTestMode;
  //   //   return { ...currency, hidden: filterUs || filterTestMode };
  //   // });
  //   // setCurrencies(filteredCurrencies);
  //   setTokens(getData);
  // }, []);

  return (
    <>
      <Flex
        display="grid"
        maxWidth="800px"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="1fr"
      >
        <Button onClick={setSupportedInUs.toggle}>
          Supported in USA: {supportedInUs.toString()}
        </Button>
        <Button onClick={setSupportsTestMode.toggle}>
          Supports test mode: {supportsTestMode.toString()}
        </Button>

        <Button onClick={() => sortBy("name")}>Sort by Name</Button>
        <Button onClick={() => sortBy("code")}>Sort by Symbol</Button>
        <Button onClick={() => shuffle()}>Shuffle</Button>
      </Flex>
      <Flex
        display="grid"
        maxWidth="800px"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="1fr"
      >
        <NextSeo title="MoonPay" />

        {tokens &&
          tokens.map((token: Token) => (
            <Currency token={token} key={token.id} />
          ))}
      </Flex>
    </>
  );
};

export default Home;
