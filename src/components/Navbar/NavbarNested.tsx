import React from "react";
import {
  IconNotes,
  IconGauge,
  IconRocket,
  IconFileAnalytics,
  IconCalendarStats,
  IconShip,
  IconSatellite,
  IconUser,
} from "@tabler/icons-react";
import { Box, Group, ScrollArea, NavLink, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const apiRoutes = [
  {
    label: "Company Info",
    icon: IconNotes,
    link: "/company-info",
    endpoint: "company",
  },
  { label: "Crew", icon: IconGauge, link: "/resources/crew", endpoint: "crew" },
  {
    label: "Rockets",
    icon: IconRocket,
    link: "/resources/rockets",
    endpoint: "rockets",
  },
  {
    label: "Payloads",
    icon: IconFileAnalytics,
    link: "/resources/payloads",
    endpoint: "payloads",
  },
  {
    label: "Launches",
    icon: IconCalendarStats,
    link: "/resources/launches",
    endpoint: "launches",
  },
  {
    label: "Dragons",
    icon: IconRocket,
    link: "/resources/dragons",
    endpoint: "dragons",
  },
  {
    label: "Landpads",
    icon: IconShip,
    link: "/resources/landpads",
    endpoint: "landpads",
  },
  {
    label: "Starlink",
    icon: IconSatellite,
    link: "/resources/starlink",
    endpoint: "starlink",
  },
];

interface NavbarNestedProps {
  isOpen: boolean;
  onItemClick: () => void; // Accept onItemClick as a prop to close the navbar on item click
  username: string; // Accept username as a prop to display in the navbar
}

export function NavbarNested({
  isOpen,
  onItemClick,
  username,
}: NavbarNestedProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        alignItems: "center",
        transition: "width 0.3s ease", // Add transition for smooth opening/closing
        width: isOpen ? "250px" : "0", // Adjust width when navbar is open/closed
        overflow: "hidden",
        "@media (max-width: 768px)": {
          width: isOpen ? "100%" : "0", // Full-width on mobile
          transition: "width 0.3s ease", // Ensure smooth transition on mobile
        },
      }}
    >
      <ScrollArea style={{ height: "100%", width: "100%", padding: "20px" }}>
        <Stack>
          {apiRoutes.map((route, index) => (
            <NavLink
              key={index}
              label={route.label}
              icon={<route.icon />}
              onClick={() => {
                navigate(route.link);
                onItemClick();
              }}
            />
          ))}
        </Stack>
      </ScrollArea>

      {/* User login info at the bottom of the navbar */}
      <Box
        sx={{
          marginTop: "auto",
          padding: "10px",
          width: "100%",
        }}
      >
        <Group
          position="center"
          spacing="xs"
          style={{
            cursor: "pointer",
            width: "100%",
            padding: "10px 0",
            marginBottom: "1rem",
          }}
          onClick={() => navigate("/profile")}
        >
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconUser size={24} />
            <Text size="sm" style={{ fontWeight: "bold" }}>
              {username}
            </Text>
          </Box>
        </Group>
      </Box>
    </Box>
  );
}
