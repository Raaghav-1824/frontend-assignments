import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Text,
  Loader,
  Card,
  Center,
  Image,
  Badge,
  Group,
  Stack,
  Button,
  Container,
  ScrollArea,
  Pagination,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApiData } from "../../api/spaceXApi";
import ReusableTable from "../../components/Table/ReusableTable";
import { Link } from "react-router-dom";

interface PayloadData {
  id: string;
  name: string;
  type: string;
  mass_kg: number;
  mass_lbs: number;
  orbit: string;
  nationalities: string[];
  manufacturers: string[];
}

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  details: string | null;
  links: {
    patch: { small: string; large: string };
    webcast: string | null;
    wikipedia: string | null;
  };
  failures: { time: number; reason: string }[];
}

interface Crew {
  id: string;
  name: string;
  agency: string;
  image: string;
  status: string;
  wikipedia: string;
  launches: string[];
}

interface Rocket {
  id: string;
  name: string;
  type: string;
  cost_per_launch: number;
  country: string;
  active: boolean;
  description: string;
  flickr_images: string[];
}

const ResourceList: React.FC = () => {
  const { endpoint } = useParams<{ endpoint: string }>();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 15; // Define items per page here

  // Ensure correct typing for useQuery
  const { data, error, isLoading } = useQuery({
    queryKey: endpoint ? [endpoint, page] : ["default"], // Ensure a valid key is always provided
    queryFn: () =>
      fetchApiData(`${endpoint}?page=${page}&page_size=${itemsPerPage}`), // Fetcher function
    enabled: !!endpoint, // Only fetch when endpoint is defined
  });

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error instanceof Error) {
    return (
      <Center mt="md">
        <Text color="red">{error.message}</Text>
      </Center>
    );
  }

  return (
    <Container size="lg">
      {/* <HeaderSearch toggleNavbar={toggle} isNavbarOpen={opened} /> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {/* Render Payload Table */}
        {endpoint === "payloads" && (
          <ScrollArea>
            <ReusableTable
              data={data as PayloadData[]}
              columns={[
                { key: "name", label: "Payload Name" },
                { key: "type", label: "Type" },
                { key: "mass_kg", label: "Mass (kg)" },
                { key: "mass_lbs", label: "Mass (lbs)" },
                { key: "orbit", label: "Orbit" },
                { key: "nationalities", label: "Nationalities" },
                { key: "manufacturers", label: "Manufacturers" },
              ]}
              onRowClick={(payload: PayloadData) => {
                console.log("Payload clicked:", payload);
              }}
              detailLinkPrefix="/payload" // Added detailLinkPrefix for Payload
            />
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                onChange={(p) => setPage(p)}
                total={Math.ceil((data as PayloadData[]).length / itemsPerPage)}
                size="sm" // Smaller pagination size
                color="blue"
                style={{ marginTop: "10px" }} // Added spacing above pagination
              />
            </div>
          </ScrollArea>
        )}

        {/* Render Rocket Cards */}
        {endpoint === "rockets" &&
          Array.isArray(data) &&
          data.map((item) => {
            const rocket = item as Rocket;
            return (
              <Card
                key={rocket.id}
                shadow="lg"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "450px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Image
                  src={rocket.flickr_images[0]}
                  alt={rocket.name}
                  height={200}
                  fit="cover"
                  radius="sm"
                  style={{ marginBottom: "1rem" }}
                />
                <Stack spacing="xs">
                  <Group position="apart">
                    <Text size="lg" weight={600}>
                      {rocket.name}
                    </Text>
                    <Badge color={rocket.active ? "green" : "red"} radius="sm">
                      {rocket.active ? "Active" : "Inactive"}
                    </Badge>
                  </Group>
                  <Text size="sm" color="gray">
                    {rocket.description.slice(0, 100)}...
                  </Text>
                  <Group spacing="xs">
                    <Text size="sm" weight={500}>
                      Type:
                    </Text>
                    <Text size="sm" color="blue">
                      {rocket.type}
                    </Text>
                  </Group>
                  <Group spacing="xs">
                    <Text size="sm" weight={500}>
                      Country:
                    </Text>
                    <Text size="sm" color="blue">
                      {rocket.country}
                    </Text>
                  </Group>
                  <Group spacing="xs">
                    <Text size="sm" weight={500}>
                      Cost/Launch:
                    </Text>
                    <Text size="sm" color="blue">
                      ${rocket.cost_per_launch.toLocaleString()}
                    </Text>
                  </Group>
                </Stack>
                <Button
                  variant="outline"
                  color="blue"
                  fullWidth
                  onClick={() => navigate(`/rocket/${rocket.id}`)}
                >
                  View Details
                </Button>
              </Card>
            );
          })}

        {/* Render Crew Cards */}
        {endpoint === "crew" &&
          Array.isArray(data) &&
          data.map((item) => {
            const crew = item as Crew;
            return (
              <Card
                key={crew.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "space-between",
                  minHeight: "350px",
                  position: "relative",
                }}
              >
                <Image
                  src={crew.image}
                  alt={crew.name}
                  width={150}
                  height={150}
                  fit="cover"
                  radius="xl"
                  style={{
                    objectFit: "cover",
                    maxHeight: "150px",
                    marginBottom: "1rem",
                  }}
                />
                <Stack spacing="xs" align="center" style={{ flexGrow: 1 }}>
                  <Text size="lg" weight={500}>
                    {crew.name}
                  </Text>
                  <Text size="sm" color="dimmed">
                    {crew.agency}
                  </Text>
                  <Text size="sm" color="dimmed">
                    Status: {crew.status}
                  </Text>
                </Stack>
                <Group spacing="xs" position="center">
                  {crew.launches && crew.launches.length > 0 && (
                    <Button
                      variant="light"
                      color="blue"
                      component={Link}
                      to={`/launch-details/${crew.launches[0]}`}
                    >
                      Launches
                    </Button>
                  )}
                  {crew.wikipedia && (
                    <Button
                      variant="light"
                      color="orange"
                      component="a"
                      href={crew.wikipedia}
                      target="_blank"
                    >
                      Wikipedia
                    </Button>
                  )}
                </Group>
              </Card>
            );
          })}

        {/* Render Launch Table */}
        {endpoint === "launches" && (
          <ScrollArea>
            <ReusableTable
              data={data as Launch[]}
              columns={[
                { key: "name", label: "Launch Name" },
                { key: "date_utc", label: "Launch Date (UTC)" },
                { key: "success", label: "Success" },
                { key: "details", label: "Details" },
              ]}
              onRowClick={(launch: Launch) => {
                console.log("Launch clicked:", launch);
              }}
              detailLinkPrefix="/launch-details"
            />
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                onChange={(p) => setPage(p)}
                total={Math.ceil((data as Launch[]).length / itemsPerPage)}
                size="sm"
                color="blue"
                style={{ marginTop: "10px" }}
              />
            </div>
          </ScrollArea>
        )}
      </div>
    </Container>
  );
};

export default ResourceList;
