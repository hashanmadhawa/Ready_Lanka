import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";
import { emergencies } from "../../data/emergencies";
import { Field, Page, SectionTitle } from "../../components/UI";

export default function Guides() {
  const { theme } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const guides = useMemo(() => emergencies.filter((item) => `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  return <Page><ScrollView><SectionTitle title="Emergency guides" subtitle="Search locally stored guidance." /><Field value={query} onChangeText={setQuery} placeholder="Search floods, fires, storms..." />{guides.map((item) => <Pressable key={item.id} style={[styles.card, { backgroundColor: theme.uiBackground, borderColor: theme.border }]} onPress={() => router.push(`/guide/${item.id}`)}><Text style={styles.emoji}>{item.emoji}</Text><View style={styles.body}><Text style={[styles.title, { color: theme.text }]}>{item.title}</Text><Text style={[styles.muted, { color: theme.muted }]}>{item.summary}</Text><Text style={[styles.meta, { color: theme.primary }]}>{item.category} · {item.severity}</Text></View><Text style={[styles.arrow, { color: theme.muted }]}>›</Text></Pressable>)}{guides.length === 0 && <Text style={[styles.empty, { color: theme.muted }]}>No guides match your search.</Text>}</ScrollView></Page>;
}

const styles = StyleSheet.create({ card: { borderWidth: 1, borderRadius: 15, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 }, emoji: { fontSize: 30 }, body: { flex: 1 }, title: { fontSize: 15, fontWeight: "800", marginBottom: 3 }, muted: { fontSize: 12, lineHeight: 18 }, meta: { fontSize: 11, fontWeight: "800", marginTop: 6 }, arrow: { fontSize: 28 }, empty: { textAlign: "center", padding: 24 }
});
