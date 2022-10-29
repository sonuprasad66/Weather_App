import {
  Button,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RepeatIcon, Search2Icon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocation,
  getWeather,
  getWeatherOncurrentLocation,
} from "../Redux/action";
import "../App.css";
import { ForecastBox } from "./Forecast";
import { Loading } from "./Loading";
import { REQUEST_OF_DATA } from "../Redux/actionTypes";

export const Weather = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {
    map,
    forecast,
    isLoading,
    error,
    langitude,
    weatherData,
    currentLocation,
    latitude,
  } = useSelector((state) => {
    return {
      map: state.map,
      isLoading: state.isLoading,
      langitude: state.langitude,
      weatherData: state.weatherData,
      latitude: state.latitude,
      forecast: state.forecast,
      currentLocation: state.currentLocation,
      error: state.error,
    };
  });
  // console.log(isLoading);
  const [city, setCity] = useState("");
  const [isRotate, setIsRotate] = useState(false);
  const onclickWeather = () => {
    if (city == "") {
      toast({
        title: "City name is empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch(getWeather(city));
      setCity("");
    }
  };
  useEffect(() => {
    dispatch({ type: REQUEST_OF_DATA });
    dispatch(getLocation());
  }, [dispatch]);

  const handleSyncData = () => {
    setIsRotate(true);
    dispatch(getWeatherOncurrentLocation(latitude, langitude));
  };
  if (error) {
    toast({
      title: `${error.response.statusText}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box>
        <Box bg="#D7DEFA">
          <SimpleGrid columns={[1, 1, 2]} m="auto" w="70%">
            <Heading
              mt={5}
              textAlign={"center"}
              color={"#5E82F4"}
              fontFamily="poppins"
              size={"xl"}
            >
              Weather forecast
            </Heading>
            <Box mb={5} mt={5} w="100%">
              <Flex justifyContent={"center"}>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  style={{
                    width: "100%",
                    height: "45px",
                    border: "2px solid #5E82F4",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                  variant={"outline"}
                  placeholder="Enter City Name"
                />
                <Button
                  onClick={onclickWeather}
                  ml={1}
                  h="45px"
                  borderRadius={10}
                  bg="#5E82F4"
                  _hover={{ bg: "white", color: "#5E82F4" }}
                >
                  <Search2Icon
                    _hover={{ color: "#5E82F4" }}
                    color={"white"}
                    boxSize={6}
                  />
                </Button>
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>

        {/* ----------------------------Main Data------------------------------------------------- */}
        <SimpleGrid w="95%" m="auto" mt={7} columns={[1, 2, 2, 3]} spacing={10}>
          <Box
            w="100%"
            p={10}
            color={"#5E82F4"}
            borderRadius={25}
            boxShadow="dark-lg"
            className="box"
            h={"300px"}
            textAlign="center"
            fontWeight="bold"
          >
            <Flex mt={-5} mr={-5} justifyContent={"right"}>
              <RepeatIcon
                className={isRotate ? "iconRotate" : undefined}
                onAnimationEnd={() => {
                  setIsRotate(false);
                }}
                cursor={"pointer"}
                onClick={handleSyncData}
                boxSize={8}
              />
            </Flex>

            <Heading textAlign={"center"} fontFamily="poppins">
              {weatherData && weatherData.name}
            </Heading>

            <Heading
              mt={5}
              textAlign={"center"}
              size={["4xl", "3xl", "4xl"]}
              fontFamily="poppins"
            >
              {Math.round(weatherData?.main?.temp) - 273}&deg;C
            </Heading>

            <Heading
              mt={5}
              textAlign={"center"}
              size={"xl"}
              fontFamily="poppins"
            >
              {weatherData && weatherData?.weather?.map((item) => item.main)}
            </Heading>
          </Box>
          {/* ---------------------------Main Details--------------------------------------------------------- */}
          <Box
            h={"300px"}
            fontFamily="poppins"
            color={"#3E206D"}
            w="100%"
            className="box"
            borderRadius={25}
            boxShadow="dark-lg"
          >
            <Flex p="8px 8px" h="100%">
              <VStack
                spacing={4}
                align={"left"}
                w="45%"
                h="100%"
                color="#5E82F4"
                fontFamily="poppins"
                fontWeight="bold"
                paddingLeft="30px"
                fontSize="18px"
              >
                <Text mt={5}>Felt Temp.</Text>
                <Text>Humidity</Text>
                <Text>Wind</Text>
                <Text>Visibility</Text>
                <Text>Max Temp.</Text>
                <Text>Min Temp.</Text>
              </VStack>
              <VStack
                ml={10}
                h="100%"
                w="55%"
                bg={"#5E82F4"}
                spacing={4}
                color="white"
                fontWeight="bold"
                paddingLeft="30px"
                fontSize="18px"
                borderRadius={25}
                align={"left"}
              >
                <Text mt={5}>
                  {(weatherData && weatherData?.main?.feels_like - 273).toFixed(
                    2
                  )}
                  &deg;C
                </Text>
                <Text>{weatherData && weatherData?.main?.humidity}%</Text>
                <Text>
                  {(weatherData && weatherData?.wind?.speed * 3.6).toFixed(2)}{" "}
                  Km/h
                </Text>
                <Text>
                  {(weatherData && weatherData?.visibility * 0.001).toFixed(2)}{" "}
                  Km
                </Text>
                <Text>
                  {(weatherData && weatherData?.main?.temp_max - 273).toFixed(
                    2
                  )}
                  &deg;C
                </Text>
                <Text>
                  {(weatherData && weatherData?.main?.temp_min - 273).toFixed(
                    2
                  )}
                  &deg;C
                </Text>
              </VStack>
            </Flex>
          </Box>
          {/* ---------------------------Main map--------------------------------------------------------- */}
          <Box
            h={"300px"}
            className="box"
            borderRadius={25}
            boxShadow="dark-lg"
            w="100%"
          >
            <iframe
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "25px",
                fontFamily: "poppins",
              }}
              src={map}
            ></iframe>
          </Box>
        </SimpleGrid>
      </Box>
      <SimpleGrid columns={[2, 3, 4, 8]} spacing={6} p={5} mt={7}>
        {forecast &&
          forecast.map((item, i) => <ForecastBox key={i} data={item} />)}
      </SimpleGrid>
      <Text
        textAlign={"center"}
        color={"#5E82F4"}
        fontWeight="bold"
        fontSize="18px"
        fontFamily="poppins"
        m={5}
      >
        © Made With ❤️ By Sonu Prasad.
      </Text>
    </>
  );
};
