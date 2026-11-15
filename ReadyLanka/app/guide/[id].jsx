import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppData } from "../../contexts/AppDataContext";
import { emergencies } from "../../data/emergencies";
import { Button, Page } from "../../components/UI";

export default function GuideDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { favorites, toggleFavorite } = useAppData();
  const guideId = Array.isArray(id) ? id[0] : id;
  const item = emergencies.find((guide) => guide.id === guideId);
  const [section, setSection] = useState("preparation");

  if (!item) return <Page><Text style={{ color: theme.text }}>Guide not found.</Text></Page>;
  const saved = favorites.includes(item.id);
  return <Page><ScrollView contentContainerStyle={styles.scroll}><Pressable onPress={() => router.back()}><Text style={[styles.back, { color: theme.primary }]}>‹ Back to guides</Text></Pressable><View style={[styles.hero, { backgroundColor: theme.hero }]}><Text style={styles.emoji}>{item.emoji}</Text><Text style={styles.title}>{item.title}</Text><Text style={[styles.summary, { color: theme.heroText }]}>{item.summary}</Text></View><Button title={saved ? "★  Saved guide" : "☆  Save guide"} secondary onPress={() => toggleFavorite(item.id)} /><View style={[styles.segment, { backgroundColor: theme.soft }]}>{["preparation", "during", "after"].map((name) => <Pressable key={name} style={[styles.segmentButton, section === name && { backgroundColor: theme.primary }]} onPress={() => setSection(name)}><Text style={[styles.segmentText, { color: section === name ? "#FFFFFF" : theme.muted }]}>{name[0].toUpperCase() + name.slice(1)}</Text></Pressable>)}</View><View style={[styles.card, { backgroundColor: theme.uiBackground, borderColor: theme.border }]}><Text style={[styles.heading, { color: theme.text }]}>{section} an emergency</Text>{item[section].map((tip, index) => <View key={tip} style={styles.tip}><Text style={[styles.number, { backgroundColor: theme.soft, color: theme.primary }]}>{index + 1}</Text><Text style={[styles.tipText, { color: theme.text }]}>{tip}</Text></View>)}</View></ScrollView></Page>;
}

const styles = StyleSheet.create({ scroll: { flexGrow: 1, paddingBottom: 24 }, back: { fontWeight: "800", marginBottom: 16 }, hero: { borderRadius: 20, padding: 20, marginBottom: 14 }, emoji: { fontSize: 30 }, title: { color: "#FFFFFF", fontSize: 27, fontWeight: "900", marginTop: 8 }, summary: { fontSize: 14, lineHeight: 21, marginTop: 9 }, segment: { flexDirection: "row", borderRadius: 12, padding: 4, marginVertical: 16 }, segmentButton: { flex: 1, alignItems: "center", padding: 10, borderRadius: 9 }, segmentText: { fontSize: 12, fontWeight: "700" }, card: { borderWidth: 1, borderRadius: 16, padding: 16 }, heading: { fontSize: 17, fontWeight: "800", marginBottom: 14 }, tip: { flexDirection: "row", marginBottom: 14, alignItems: "flex-start" }, number: { borderRadius: 15, width: 28, height: 28, textAlign: "center", paddingTop: 5, fontWeight: "900", marginRight: 10 }, tipText: { flex: 1, fontSize: 14, lineHeight: 21 }
});
