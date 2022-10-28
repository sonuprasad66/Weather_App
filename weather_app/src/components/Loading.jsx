import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import loadingPng from "../data/Box-Loading-2.gif"

export const Loading = () => {
  return (
    <Flex alignContent={"center"} justifyContent={"center"}>
   <Image src={loadingPng} alt="x" />
   </Flex>
  )
}
