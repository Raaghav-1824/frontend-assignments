import React from "react";
import {
  Card,
  Text,
  Image,
  Badge,
  Button,
  Group,
  Stack,
  MediaQuery,
} from "@mantine/core";

interface LaunchDetailCardProps {
  launch: {
    id: string;
    name: string;
    date_utc: string;
    success: boolean;
    details: string | null;
    links: {
      patch: { small: string; large: string | null };
      webcast: string | null;
      wikipedia: string | null;
    };
    failures: { time: number; reason: string }[];
  };
}

const LaunchDetailCard: React.FC<LaunchDetailCardProps> = ({ launch }) => {
  const imageUrl = launch.links.patch.large || "";

  return (
    <MediaQuery
      smallerThan={400}
      styles={{
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Group
        align="flex-start"
        spacing="lg"
        style={{
          maxWidth: "100%",
          margin: "20px auto",
          justifyContent: "center",
          flexWrap: "wrap",
          height: "80vh",
        }}
      >
        {/* Card for the image */}
        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            flex: "1",
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            backgroundColor: "#fff",
            border: "1px solid #eaeaea",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Card.Section style={{ width: "100%", textAlign: "center" }}>
            {imageUrl ? (
              <Image
                fit="cover"
                src={imageUrl}
                alt={launch.name}
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "16px",
                }}
              />
            ) : (
              <Text>No image available</Text>
            )}
          </Card.Section>
        </Card>

        {/* Card for the launch details */}
        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            flex: "1",
            height: "100%",
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#fff",
            border: "1px solid #eaeaea",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing="md">
            <Group position="apart">
              <Text weight={700} size="xl" style={{ color: "#333" }}>
                {launch.name}
              </Text>
              <Badge
                color={launch.success ? "green" : "red"}
                variant="light"
                size="lg"
              >
                {launch.success ? "Success" : "Failed"}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              <strong>Launch Date:</strong>{" "}
              {new Date(launch.date_utc).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              |{" "}
              {new Date(launch.date_utc).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text size="sm" color="#444" style={{ lineHeight: 1.5 }}>
              {launch.details || "No additional details available."}
            </Text>

            {launch.failures.length > 0 && (
              <Text size="sm" color="red">
                <strong>Failure Reason:</strong> {launch.failures[0].reason}
              </Text>
            )}

            <Group
              position="center"
              mt="md"
              spacing="sm"
              style={{ flexWrap: "wrap" }}
            >
              {launch.links.webcast && (
                <Button
                  variant="outline"
                  color="blue"
                  onClick={() =>
                    window.open(launch.links.webcast as string, "_blank")
                  }
                  style={{ minWidth: "150px" }}
                >
                  Watch Webcast
                </Button>
              )}
              {launch.links.wikipedia && (
                <Button
                  variant="outline"
                  color="gray"
                  onClick={() =>
                    window.open(launch.links.wikipedia as string, "_blank")
                  }
                  style={{ minWidth: "150px" }}
                >
                  View Wikipedia
                </Button>
              )}
            </Group>
          </Stack>
        </Card>
      </Group>
    </MediaQuery>
  );
};

export default LaunchDetailCard;
