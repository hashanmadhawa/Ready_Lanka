import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Page, SectionTitle } from "../components/UI";

export default function About() {
  const { theme } = useTheme();
  return <Page><ScrollView><SectionTitle title="About ReadyLanka" subtitle="An offline emergency-preparedness companion." /><Text style={[styles.text, { color: theme.text }]}>ReadyLanka provides locally stored emergency guidance, a preparation checklist, saved guides, and personal emergency contacts.</Text><Text style={[styles.text, { color: theme.text }]}>Use the theme button in the top-right corner to switch between light and dark mode. Your favorites, checklist progress and contacts are stored locally on the device.</Text><Text style={[styles.note, { color: theme.muted }]}>Educational guidance only. Always follow current instructions from official emergency authorities.</Text></ScrollView></Page>;
}

const styles = StyleSheet.create({ text: { fontSize: 15, lineHeight: 24, marginBottom: 16 }, note: { fontSize: 12, lineHeight: 18, marginTop: 10 }
});
