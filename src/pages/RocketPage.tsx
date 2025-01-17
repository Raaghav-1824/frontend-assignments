import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Center, Loader, Text, Container } from "@mantine/core";
import { fetchApiData } from "../api/spaceXApi";
import RocketDetailCard from "../components/RocketDetailCard";

const RocketPage = () => {
  const { rocketId } = useParams<{ rocketId: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["rocket", rocketId],
    queryFn: () => fetchApiData(`rockets/${rocketId}`),
    enabled: !!rocketId,
  });

  if (isLoading) {
    return (
      <Center style={{ height: "calc(100vh - 60px)" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error || !data) {
    return (
      <Center style={{ paddingTop: "2rem" }}>
        <Text color="red">Failed to fetch rocket details. Please try again.</Text>
      </Center>
    );
  }

  return (
    <Container
      fluid
      px={{ base: "xs", sm: "md", lg: "xl" }}
      py={{ base: "xs", sm: "md", lg: "xl" }}
      style={{
        height: "calc(100vh - 100px)", // Full height minus navbar
        maxWidth: "100%",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RocketDetailCard rocket={data} />
    </Container>
  );
};

export default RocketPage;
