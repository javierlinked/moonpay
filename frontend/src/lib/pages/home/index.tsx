import { Button, Flex, useBoolean } from "@chakra-ui/react";
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

const Home = ({ initialData }: { initialData: Token[] }) => {
  const [tokens, setTokens] = useState<Token[]>(initialData);
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
    const filters = supportedInUs || supportsTestMode;
    setTokens(filters ? filtered : initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Flex className="tokenList buttons">
        <Button
          onClick={setSupportedInUs.toggle}
          style={{
            backgroundColor: supportedInUs ? "green" : "#E2E8F0",
          }}
        >
          Supported in USA
        </Button>
        <Button
          onClick={setSupportsTestMode.toggle}
          style={{ backgroundColor: supportsTestMode ? "green" : "#E2E8F0" }}
        >
          Supports test mode
        </Button>
      </Flex>
      <Flex className="tokenList buttons">
        <Button onClick={() => sortBy("name")}>Sort by Name</Button>
        <Button onClick={() => sortBy("code")}>Sort by Symbol</Button>
        <Button onClick={shuffle}>Shuffle</Button>
      </Flex>
      <Flex className="tokenList">
        {tokens &&
          tokens.map((token: Token) => (
            <Currency token={token} key={token.id} />
          ))}
      </Flex>
    </>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch("https://api.moonpay.com/v3/currencies");
  const json = await res.json();
  return { initialData: json };
};

export default Home;
