import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";
import { emergencies } from "../../data/emergencies";
import { Button, Card, Page, SectionTitle } from "../../components/UI";

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();
  const openGuides = () => router.navigate("/guides");
  const openGuide = (id) => router.push({ pathname: "/guide/[id]", params: { id: String(id) } });

  return <Page>
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { backgroundColor: theme.hero }]}>
        <Text style={styles.overline}>OFFLINE EMERGENCY COMPANION</Text>
        <Text style={styles.heroTitle}>Be prepared.{"\n"}Stay safe.</Text>
        <Text style={[styles.heroText, { color: theme.heroText }]}>Simple emergency guidance for you and your family.</Text>
        <Button title="Explore emergency guides" onPress={openGuides} />
      </View>

      <SectionTitle title="Emergency situations" subtitle="Choose a guide to learn what to do." />
      <View style={styles.grid}>
        {emergencies.slice(0, 4).map((item) => (
          <Pressable key={item.id} accessibilityRole="button" onPress={() => openGuide(item.id)} style={styles.categoryPressable}>
            <Card style={styles.category}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.muted, { color: theme.muted }]}>{item.category}</Text>
              <Text style={[styles.openLabel, { color: theme.primary }]}>Open guide ›</Text>
            </Card>
          </Pressable>
        ))}
      </View>

      <SectionTitle title="Quick access" subtitle="Useful preparation tools." />
      <Button title="🎒  Open emergency kit" secondary onPress={() => router.navigate("/kit")} />
      <Button title="☎  Manage contacts" secondary onPress={() => router.navigate("/contacts")} />
      <Link href="/about" style={[styles.about, { color: theme.primary }]}>About this project</Link>
    </ScrollView>
  </Page>;
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingBottom: 24 },
  hero: { borderRadius: 22, padding: 22, marginBottom: 24 },
  overline: { color: "#A8D4BE", fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  heroTitle: { color: "#FFFFFF", fontSize: 32, lineHeight: 38, fontWeight: "900", marginTop: 12 },
  heroText: { fontSize: 14, lineHeight: 21, marginTop: 9, marginBottom: 17 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "stretch", marginBottom: 15 },
  categoryPressable: { width: "48%", marginBottom: 12 },
  category: { minHeight: 150, height: "100%", marginBottom: 0 },
  emoji: { fontSize: 30, marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: "800", marginBottom: 3 },
  muted: { fontSize: 12, lineHeight: 18 },
  openLabel: { fontSize: 11, fontWeight: "800", marginTop: 10 },
  about: { textAlign: "center", marginTop: 12, textDecorationLine: "underline" }
});
