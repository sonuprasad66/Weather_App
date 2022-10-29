import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import "../App.css";
const dateFormat = (dt) => {
  const milliseconds = dt * 1000;
  let myDate = new Date(milliseconds);
  let date = myDate.toLocaleString("en-GB").split(",")[0];
  let day = myDate.toLocaleString("en-US", { weekday: "long" });
  return { date, day };
};
export const ForecastBox = ({ data }) => {
  const { date, day } = dateFormat(data.dt);

  return (
    <Box borderRadius={25} boxShadow="dark-lg" className="box" cursor="pointer">
      <Box
        textAlign={"center"}
        p={3}
        color={"#5E82F4"}
        fontWeight="bold"
        fontSize="18px"
        fontFamily="poppins"
        h="35%"
      >
        <Text>{date}</Text>
        <Text>{day}</Text>
      </Box>
      <Box
        bg={"#5E82F4"}
        pb={2}
        borderBottomLeftRadius={25}
        borderBottomRightRadius={25}
        h="66%"
      >
        <Flex alignItems={"center"} justifyContent="center">
          {data?.weather?.map((e) => (
            <Image src={`https://openweathermap.org/img/wn/${e.icon}@2x.png`} />
          ))}
        </Flex>
        <Flex
          fontSize={18}
          color={"white"}
          fontWeight="bold"
          p={1}
          alignItems={"center"}
          justifyContent="space-around"
        >
          <Text>
            {Math.round(data.temp.day)}
            <sup>o</sup> C
          </Text>

          <Text>
            {Math.round(data.temp.night)}
            <sup>o</sup> C
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
