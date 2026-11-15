import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppData } from "../../contexts/AppDataContext";
import { emergencies } from "../../data/emergencies";
import { Page, SectionTitle } from "../../components/UI";

export default function Saved() {
  const { theme } = useTheme();
  const { favorites } = useAppData();
  const router = useRouter();
  const saved = emergencies.filter((item) => favorites.includes(item.id));
  return <Page><ScrollView><SectionTitle title="Saved guides" subtitle="Your favorite guides are available offline." />{saved.map((item) => <Pressable key={item.id} style={[styles.card, { backgroundColor: theme.uiBackground, borderColor: theme.border }]} onPress={() => router.push(`/guide/${item.id}`)}><Text style={styles.emoji}>{item.emoji}</Text><View style={{ flex: 1 }}><Text style={[styles.title, { color: theme.text }]}>{item.title}</Text><Text style={[styles.muted, { color: theme.muted }]}>{item.summary}</Text></View><Text style={styles.star}>★</Text></Pressable>)}{saved.length === 0 && <Text style={[styles.empty, { color: theme.muted }]}>No saved guides yet. Open a guide and tap Save guide.</Text>}</ScrollView></Page>;
}

const styles = StyleSheet.create({ card: { borderWidth: 1, borderRadius: 15, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 }, emoji: { fontSize: 30 }, title: { fontSize: 15, fontWeight: "800", marginBottom: 3 }, muted: { fontSize: 12, lineHeight: 18 }, star: { color: "#E6A23C", fontSize: 22 }, empty: { textAlign: "center", padding: 24 }
});
