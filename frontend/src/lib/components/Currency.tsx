import { chakra } from "@chakra-ui/react";

import type { Token } from "lib/pages/home";

export interface CurrencyProps {
  token: Token;
}

const Currency: React.FC<CurrencyProps> = (token) => {
  return (
    <chakra.div id="{token.id}">
      <h3>{token.name}</h3>
      <p>Symbol: {token.symbol}</p>
      <p>USA: {token.isSupportedInUS}</p>
      <p>Test Mode: {token.supportsTestMode}</p>
    </chakra.div>
  );
};

export default Currency;
