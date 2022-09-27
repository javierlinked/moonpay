import { Box, Flex, Heading, Image } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p={2}>
        <Heading size="md">
          <Image
            src="/assets/icons/logo-full-purple.svg"
            alt="MoonPay Logo"
            width="200px"
            float="left"
            paddingRight="20px"
          />
          Supported Currencies
        </Heading>
      </Box>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
