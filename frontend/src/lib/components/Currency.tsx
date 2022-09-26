import { chakra } from "@chakra-ui/react";

import type { Token } from "lib/pages/home";

export interface CurrencyProps {
  token: Token;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Currency: React.FC<CurrencyProps> = ({ token, ...props }) => {
  return (
    <chakra.div id="{token.id}" border="1px solid">
      <h3>{token.name}</h3>
      <p>Symbol: {token.code}</p>
      <p>
        USA: <chakra.span>{token.isSupportedInUS ? "✅" : "❌"}</chakra.span>
      </p>
      <p>
        Test Mode:{" "}
        <chakra.span>{token.supportsTestMode ? "✅" : "❌"}</chakra.span>
      </p>
    </chakra.div>
  );
};

export default Currency;
