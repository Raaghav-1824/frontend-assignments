import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Group } from "@mantine/core";
import { Link } from "react-router-dom";

type HeaderSearchProps = {
  toggleNavbar: () => void;
  isNavbarOpen: boolean;
};

export function HeaderSearch({
  toggleNavbar,
  isNavbarOpen,
}: HeaderSearchProps) {
  return (
    <header
      className="header"
      style={{
        backgroundColor: "#f5f7fa",
        padding: "10px 20px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 500,
        height: "60px",
        position: "relative",
        flexWrap: "wrap",
      }}
    >
      <Group style={{ alignItems: "center", gap: "10px", flex: 1 }}>
        <Burger
          opened={isNavbarOpen}
          onClick={toggleNavbar}
          size="sm"
          style={{ color: "#1a73e8", cursor: "pointer" }}
        />
        <Link to="/" style={{ textAlign: "center" }}>
          <img
            src="/assets/SpaceX_Logo_Black.png"
            alt="Project Logo"
            width={100}
            height={25}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </Group>

      <Group
        position="right"
        style={{
          gap: "12px",
          flex: 1,
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <Autocomplete
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={[
            "Launches",
            "Payloads",
            "Rockets",
            "SpaceX History",
            "Upcoming Missions",
          ]}
          styles={{
            input: {
              borderRadius: "6px",
              padding: "8px",
              backgroundColor: "#ffffff",
              transition: "width 0.3s ease",
              boxShadow: "none",
            },
            icon: {
              marginLeft: "10px",
            },
          }}
          style={{
            width: isNavbarOpen ? "200px" : "150px",
            maxWidth: "200px",
            transition: "width 0.3s ease",
          }}
        />
      </Group>
    </header>
  );
}
