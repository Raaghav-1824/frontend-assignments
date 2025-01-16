import React from "react";
import { Group, Text, Anchor, Container, Divider } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}>
      <Container>
        <Group
          position="apart"
          align="center"
          className="footer-links"
          style={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: "16px",
          }}
        >
          <Group spacing="lg">
            <Anchor href="#about" color="dimmed" size="sm">
              About Us
            </Anchor>
            <Anchor href="#services" color="dimmed" size="sm">
              Services
            </Anchor>
            <Anchor href="#blog" color="dimmed" size="sm">
              Blog
            </Anchor>
            <Anchor href="#contact" color="dimmed" size="sm">
              Contact
            </Anchor>
          </Group>

          <Group spacing="sm">
            <Anchor href="https://facebook.com" target="_blank">
              <IconBrandFacebook size={18} />
            </Anchor>
            <Anchor href="https://twitter.com" target="_blank">
              <IconBrandTwitter size={18} />
            </Anchor>
            <Anchor href="https://linkedin.com" target="_blank">
              <IconBrandLinkedin size={18} />
            </Anchor>
            <Anchor href="https://instagram.com" target="_blank">
              <IconBrandInstagram size={18} />
            </Anchor>
          </Group>
        </Group>

        <Divider my="md" />

        <Text
          align="center"
          color="dimmed"
          size="xs"
          style={{ fontSize: "14px" }}
        >
          © {new Date().getFullYear()} Your Company. All Rights Reserved.
        </Text>
      </Container>

      <style>
        {`
          @media (max-width: 768px) {
            .footer-links {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
