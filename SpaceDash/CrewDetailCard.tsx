import React, { useEffect, useState } from "react";
import { Card, Text, Image, Group, Button, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { fetchApiData } from "../../api/spaceXApi"; // Assuming the fetchApiData function is available

interface CrewMember {
  name: string;
  agency: string;
  image: string;
  status: string;
  wikipedia: string;
  launches: string[]; // List of launch IDs
  id: string;
}

interface CrewDetailCardProps {
  crew: CrewMember;
}

const CrewDetailCard = ({ crew }: CrewDetailCardProps) => {
  const [launchNames, setLaunchNames] = useState<string[]>([]);

  useEffect(() => {
    // Fetch launch names based on launch IDs
    const fetchLaunchNames = async () => {
      const launchPromises = crew.launches.map((launchId) =>
        fetchApiData("launches", launchId)
      );
      const launchDetails = await Promise.all(launchPromises);
      const names = launchDetails.map((launch: any) => launch.name); // Assuming `name` is available
      setLaunchNames(names);
    };

    if (crew.launches.length) {
      fetchLaunchNames();
    }
  }, [crew.launches]);

  return (
    <div style={{ padding: "10px", flex: "1 0 calc(25% - 10px)" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={crew.image}
            alt={crew.name}
            height={160}
            style={{ objectFit: "contain", width: "100%" }}
          />
        </Card.Section>
        <Stack spacing="xs" align="center" mt="md">
          <Text weight={500}>{crew.name}</Text>
          <Text size="sm" color="dimmed">
            {crew.agency}
          </Text>
          <Text size="sm" color="dimmed">
            Status: {crew.status}
          </Text>
        </Stack>

        <Group mt="md" spacing="xs" position="center">
          {/* Dynamically render buttons for each launch name */}
          {launchNames.length > 0 &&
            launchNames.map((launchName, index) => (
              <Button
                key={crew.launches[index]}
                variant="light"
                size="xs"
                color="blue"
                component={Link}
                to={`/launch-details/${crew.launches[index]}`}
                style={{ padding: "6px 12px", fontSize: "12px" }}
              >
                {launchName} 
              </Button>
            ))}

          {/* Wikipedia Button */}
          <Button
            variant="light"
            color="orange"
            radius="md"
            component="a"
            href={crew.wikipedia}
            target="_blank"
          >
            Wikipedia
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default CrewDetailCard;
