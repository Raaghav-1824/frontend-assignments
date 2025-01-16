import React from "react";
import {
  Card,
  Text,
  Image,
  Badge,
  Group,
  Stack,
  MediaQuery,
} from "@mantine/core"; // Corrected to use MediaQuery
import { Carousel } from "@mantine/carousel"; // Correct import

interface RocketDetailProps {
  rocket: {
    name: string;
    description: string;
    active: boolean;
    stages: number;
    boosters: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    flickr_images: string[];
    wikipedia: string;
  };
}

const RocketDetailCard: React.FC<RocketDetailProps> = ({ rocket }) => {
  return (
    <MediaQuery smallerThan={768} styles={{ flexDirection: "column", alignItems: "center", width: "100%" , height:"100vh" }}>
      <Group
        align="flex-start"
        spacing="lg"
        style={{
          maxWidth: "100%",
          margin: "20px auto",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left Card: Image Carousel */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{
            flex: "1",
            width: "100%",
            maxWidth: "600px",
            height: "100%",
            backgroundColor: "#fff",
            border: "1px solid #eaeaea",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <Card.Section style={{ textAlign: "center" }}>
            <Carousel withIndicators height="100%" loop align="center" slideSize="100%" styles={{ control: { backgroundColor: "#007BFF", color: "white" } }}>
              {rocket.flickr_images.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={image}
                    alt={`Rocket Image ${index + 1}`}
                    height={500}
                    radius="md"
                    style={{
                      objectFit:"contain",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card.Section>
        </Card>

        {/* Right Card: Rocket Details */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{
            flex: "2",
            height: "100%",
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#fff",
            border: "1px solid #eaeaea",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <Stack spacing="md">
            <Group position="apart">
              <Text weight={700} size="xl" style={{ color: "#333" }}>
                {rocket.name}
              </Text>
              <Badge color={rocket.active ? "green" : "red"} variant="light" size="lg">
                {rocket.active ? "Active" : "Inactive"}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              <strong>Description:</strong> {rocket.description}
            </Text>

            <Group
              position="left"
              spacing="lg"
              style={{
                flexWrap: "wrap",
                marginTop: "1rem",
                gap: "10px",
              }}
            >
              <Badge color="blue" radius="xl" size="md">
                Stages: {rocket.stages}
              </Badge>
              <Badge color="pink" radius="xl" size="md">
                Boosters: {rocket.boosters}
              </Badge>
              <Badge color="yellow" radius="xl" size="md">
                Success Rate: {rocket.success_rate_pct}%
              </Badge>
            </Group>

            <Group position="left" spacing="lg" style={{ flexWrap: "wrap", marginTop: "1rem", gap: "10px" }}>
              <Text>
                <strong>First Flight:</strong> {rocket.first_flight}
              </Text>
              <Text>
                <strong>Country:</strong> {rocket.country}
              </Text>
              <Text>
                <strong>Company:</strong> {rocket.company}
              </Text>
            </Group>

            {rocket.wikipedia && (
              <Text align="left" style={{ marginTop: "1.5rem" }}>
                <a
                  href={rocket.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "#007BFF",
                    textDecoration: "none",
                  }}
                >
                  Learn More
                </a>
              </Text>
            )}
          </Stack>
        </Card>
      </Group>
    </MediaQuery>
  );
};

export default RocketDetailCard;
