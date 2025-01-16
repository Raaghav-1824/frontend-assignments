import { Card, Text, Group, Image, Stack, Badge, Box } from "@mantine/core";
import { IconWorld, IconBrandTwitter, IconCamera } from "@tabler/icons-react";

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
    <Box
      sx={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <Card
        shadow="lg"
        radius="md"
        withBorder
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          backgroundColor: "#ffffff",
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
            height={250}
            alt="SpaceX Headquarters"
            sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
          />
        </Card.Section>
        <Stack spacing="md" p="md">
          <Text weight={600} size="xl">
            {companyData.name}
          </Text>
          <Text size="sm" color="dimmed">
            {companyData.summary}
          </Text>
          <Group spacing="lg">
            <Badge color="blue">Founded: {companyData.founded}</Badge>
            <Badge color="green">Employees: {companyData.employees}</Badge>
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
              }}
            >
              <IconWorld size={20} style={{ marginRight: 8 }} />
              <Text size="sm" weight={500}>
                Website
              </Text>
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
              }}
            >
              <IconBrandTwitter
                size={20}
                style={{ marginRight: 8, color: "#1DA1F2" }}
              />
              <Text size="sm" weight={500}>
                Twitter
              </Text>
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
              }}
            >
              <IconBrandTwitter
                size={20}
                style={{ marginRight: 8, color: "#1DA1F2" }}
              />
              <Text size="sm" weight={500}>
                Elon Musk's Twitter
              </Text>
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
              }}
            >
              <IconCamera
                size={20}
                style={{ marginRight: 8, color: "#FF0084" }}
              />
              <Text size="sm" weight={500}>
                Flickr
              </Text>
            </a>
          </Group>
        </Stack>
      </Card>
    </Box>
  );
}
