import { Flex, Button, useBoolean } from "@chakra-ui/react";
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

// const Home: NextPage<{ initialCurrencies: Token[] }> = ({
//   initialCurrencies,
// }) => {

function Home({ initialTokens }: { initialTokens: Token[] }) {
  // console.log(initialTokens);

  // const Home:NextPage<{ initialTokens: Token[] }> = ({
  //   initialTokens,
  // }: InferGetStaticPropsType<typeof getStaticProps>) => {
  //   console.log(initialTokens);
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [supportedInUs, setSupportedInUs] = useBoolean(false);
  const [supportsTestMode, setSupportsTestMode] = useBoolean(false);

  useEffect(() => {
    const filtered = tokens.filter((token) => {
      if (supportedInUs && supportsTestMode) {
        return token.isSupportedInUS && token.supportsTestMode;
      }
      if (supportedInUs) {
        return token.isSupportedInUS;
      }
      if (supportsTestMode) {
        return token.supportsTestMode;
      }
      return true;
    });
    setTokens(filtered);
  }, [supportedInUs, supportsTestMode]);

  const sortBy = (key: keyof Token) => {
    const sorted = sortArrayOfObjects(tokens, key, "ascending");
    setTokens([...sorted]);
  };

  const shuffle = () => {
    const shuffled = [...tokens].sort(() => 0.5 - Math.random());
    setTokens(shuffled);
  };

  return (
    <>
      <Flex
        display="grid"
        maxWidth="800px"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="1fr"
      >
        <Button
          onClick={setSupportedInUs.toggle}
          bgColor={supportedInUs ? "green" : undefined}
        >
          Supported in USA
        </Button>
        <Button
          onClick={setSupportsTestMode.toggle}
          bgColor={supportsTestMode ? "green" : undefined}
        >
          Supports test mode
        </Button>

        <Button onClick={() => sortBy("name")}>Sort by Name</Button>
        <Button onClick={() => sortBy("code")}>Sort by Symbol</Button>
        <Button onClick={shuffle}>Shuffle</Button>
      </Flex>
      <Flex
        display="grid"
        maxWidth="800px"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="1fr"
      >
        {tokens &&
          tokens.map((token: Token) => (
            <Currency token={token} key={token.id} />
          ))}
      </Flex>
    </>
  );
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
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

Home.getInitialProps = async () => {
  const res = await fetch("https://api.moonpay.com/v3/currencies");
  const json = await res.json();
  return { initialTokens: json };
};

export default Home;
