import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, Container, Text } from "@mantine/core";
import LaunchDetailCard from "../../components/LaunchDetailCard";
import { fetchApiData } from "../../api/spaceXApi";

const LaunchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get launch ID from params
  const [launchData, setLaunchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchApiData("launches", id)
        .then((launchDetails) => {
          setLaunchData(launchDetails);
        })
        .catch((error) => {
          console.error("Failed to fetch launch details:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container size="lg">
        <Loader size="xl" variant="dots" />
      </Container>
    );
  }

  if (!launchData) {
    return (
      <Container size="lg">
        <Text color="red">No launch data available for this ID.</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" style={{ padding: "20px" }}>
      <LaunchDetailCard launch={launchData} />
    </Container>
  );
};

export default LaunchDetailPage;
