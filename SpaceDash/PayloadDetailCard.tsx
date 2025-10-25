import React from "react";
import { useParams } from "react-router-dom";
import { Card, Text, Group, Button, Container, Stack } from "@mantine/core";

interface Payload {
  id: string;
  name: string;
  type: string;
  mass_kg: number;
  mass_lbs: number;
  orbit: string;
  reference_system: string;
  regime: string;
  customers: string[];
  nationalities: string[];
  manufacturers: string[];
  launch: string;
  dragon: {
    capsule: string | null;
    mass_returned_kg: number | null;
    mass_returned_lbs: number | null;
    flight_time_sec: number | null;
    manifest: string | null;
    water_landing: boolean | null;
    land_landing: boolean | null;
  };
}

const PayloadDetailCard: React.FC = () => {
  const { payloadId } = useParams<{ payloadId: string }>();

  // Assuming you fetch the payload data by payloadId
  const payloadData: Payload = {
    id: "5eb0e4b5b6c3bb0006eeb1e1",
    name: "FalconSAT-2",
    type: "Satellite",
    mass_kg: 20,
    mass_lbs: 43,
    orbit: "LEO",
    reference_system: "geocentric",
    regime: "low-earth",
    customers: ["DARPA"],
    nationalities: ["United States"],
    manufacturers: ["SSTL"],
    launch: "5eb87cd9ffd86e000604b32a",
    dragon: {
      capsule: null,
      mass_returned_kg: null,
      mass_returned_lbs: null,
      flight_time_sec: null,
      manifest: null,
      water_landing: null,
      land_landing: null,
    },
  };

  return (
    <Container size="sm" style={{ marginTop: "20px" }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          maxWidth: "500px",
          margin: "20px auto",
          backgroundColor: "#fff", 
          border: "1px solid #ddd",
        }}
      >
        <Text
          align="center"
          size="xl"
          weight={700}
          style={{ color: "#333", marginBottom: "10px" }}
        >
          {payloadData.name}
        </Text>
        <Stack spacing="sm">
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Type:
            </Text>
            <Text size="sm">{payloadData.type}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Mass (kg):
            </Text>
            <Text size="sm">{payloadData.mass_kg}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Mass (lbs):
            </Text>
            <Text size="sm">{payloadData.mass_lbs}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Orbit:
            </Text>
            <Text size="sm">{payloadData.orbit}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Reference System:
            </Text>
            <Text size="sm">{payloadData.reference_system}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Regime:
            </Text>
            <Text size="sm">{payloadData.regime}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Customers:
            </Text>
            <Text size="sm">{payloadData.customers.join(", ")}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Nationalities:
            </Text>
            <Text size="sm">{payloadData.nationalities.join(", ")}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Manufacturers:
            </Text>
            <Text size="sm">{payloadData.manufacturers.join(", ")}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Launch:
            </Text>
            <Text size="sm">{payloadData.launch}</Text>
          </Group>

          {/* Dragon Data */}
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Capsule:
            </Text>
            <Text size="sm">{payloadData.dragon.capsule || "N/A"}</Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Mass Returned (kg):
            </Text>
            <Text size="sm">
              {payloadData.dragon.mass_returned_kg || "N/A"}
            </Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Water Landing:
            </Text>
            <Text size="sm">
              {payloadData.dragon.water_landing ? "Yes" : "No"}
            </Text>
          </Group>
          <Group position="apart">
            <Text size="sm" weight={500} color="gray">
              Land Landing:
            </Text>
            <Text size="sm">
              {payloadData.dragon.land_landing ? "Yes" : "No"}
            </Text>
          </Group>
        </Stack>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="lg"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "10px",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => window.history.back()} // Go back to previous page
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#edf2f7")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          Back
        </Button>
      </Card>
    </Container>
  );
};

export default PayloadDetailCard;
