import {
  Card,
  Text,
  Group,
  Image,
  Stack,
  Badge,
  Box,
  Grid,
} from "@mantine/core";
import {
  IconWorld,
  IconBrandTwitter,
  IconCamera,
  IconArrowLeft,
} from "@tabler/icons-react";
import { BackButton } from "./BackButton";

export function CompanyInfo() {
  const companyData = {
    headquarters: {
      address: "Rocket Road",
      city: "Hawthorne",
      state: "California",
    },
    links: {
      website: "https://www.spacex.com/",
      flickr: "https://www.flickr.com/photos/spacex/",
      twitter: "https://twitter.com/SpaceX",
      elon_twitter: "https://twitter.com/elonmusk",
    },
    name: "SpaceX",
    founder: "Elon Musk",
    founded: 2002,
    employees: 9500,
    vehicles: 4,
    launch_sites: 3,
    test_sites: 3,
    ceo: "Elon Musk",
    coo: "Gwynne Shotwell",
    cto_propulsion: "Tom Mueller",
    valuation: 74000000000,
    summary:
      "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.",
  };

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* <BackButton
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s",
            color: "black",
          }}
        >
          <IconArrowLeft size={24} />
        </BackButton>
        <Text
          style={{
            marginLeft: "20px",
            textAlign: "center",
            fontWeight: 400,
            fontSize: "24px",
            color: "#333",
          }}
        >
          Company Information
        </Text> */}
      </Box>

      <Box sx={{ padding: "20px", minHeight: "100vh" }}>
        <Grid gutter="lg" sx={{ padding: "20px" }}>
          <Grid.Col span={12} md={6}>
            <Card
              shadow="lg"
              radius="md"
              withBorder
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Card.Section>
                <Image
                  src="/assets/spacex-headquarters.jpg"
                  alt="SpaceX Headquarters"
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    width: "100%",
                    height: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Card.Section>
            </Card>
          </Grid.Col>

          <Grid.Col span={12} md={6}>
            <Card
              shadow="lg"
              radius="md"
              withBorder
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Stack spacing="md" p="md" style={{ flex: 1 }}>
                <Text weight={700} size="xl" color="#2c3e50">
                  {companyData.name}
                </Text>
                <Text size="md" color="dimmed">
                  {companyData.summary}
                </Text>
                <Group spacing="lg">
                  <Badge color="blue">Founded: {companyData.founded}</Badge>
                  <Badge color="green">
                    Employees: {companyData.employees}
                  </Badge>
                  <Badge color="orange">
                    Valuation: ${companyData.valuation.toLocaleString()}
                  </Badge>
                </Group>

                <Text size="md">
                  <strong>Founder:</strong> {companyData.founder}
                </Text>
                <Text size="md">
                  <strong>CEO:</strong> {companyData.ceo}
                </Text>
                <Text size="md">
                  <strong>COO:</strong> {companyData.coo}
                </Text>
                <Text size="md">
                  <strong>Headquarters:</strong>{" "}
                  {`${companyData.headquarters.address}, ${companyData.headquarters.city}, ${companyData.headquarters.state}`}
                </Text>
                <Group spacing="lg" align="center" mt="sm">
                  <a
                    href={companyData.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <IconWorld size={20} style={{ marginRight: 8 }} />
                    Website
                  </a>
                  <a
                    href={companyData.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <IconBrandTwitter
                      size={20}
                      style={{ marginRight: 8, color: "#1DA1F2" }}
                    />
                    Twitter
                  </a>
                  <a
                    href={companyData.links.elon_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <IconBrandTwitter
                      size={20}
                      style={{ marginRight: 8, color: "#1DA1F2" }}
                    />
                    Elon Musk's Twitter
                  </a>
                  <a
                    href={companyData.links.flickr}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <IconCamera
                      size={20}
                      style={{ marginRight: 8, color: "#FF0084" }}
                    />
                    Flickr
                  </a>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
