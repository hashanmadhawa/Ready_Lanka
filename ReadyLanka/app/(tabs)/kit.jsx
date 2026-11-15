import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppData } from "../../contexts/AppDataContext";
import { kitItems } from "../../data/emergencies";
import { Page, SectionTitle } from "../../components/UI";

export default function Kit() {
  const { theme } = useTheme();
  const { checked, toggleKitItem } = useAppData();
  const percent = Math.round((checked.length / kitItems.length) * 100);
  return <Page><ScrollView><SectionTitle title="Emergency kit" subtitle="Check the supplies your household may need." /><View style={[styles.card, { backgroundColor: theme.uiBackground, borderColor: theme.border }]}><View style={styles.row}><Text style={[styles.title, { color: theme.text }]}>Preparation progress</Text><Text style={[styles.percent, { color: theme.primary }]}>{percent}%</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${percent}%`, backgroundColor: theme.primary }]} /></View><Text style={[styles.muted, { color: theme.muted }]}>{checked.length} of {kitItems.length} checked</Text></View>{kitItems.map((item) => { const done = checked.includes(item.id); return <Pressable key={item.id} style={[styles.card, styles.row, { backgroundColor: theme.uiBackground, borderColor: theme.border }]} onPress={() => toggleKitItem(item.id)}><View style={[styles.checkbox, { borderColor: theme.border, backgroundColor: done ? theme.primary : "transparent" }]}>{done && <Text style={styles.check}>✓</Text>}</View><View><Text style={[styles.title, { color: done ? theme.muted : theme.text, textDecorationLine: done ? "line-through" : "none" }]}>{item.name}</Text><Text style={[styles.muted, { color: theme.muted }]}>{item.detail}</Text></View></Pressable>; })}</ScrollView></Page>;
}

const styles = StyleSheet.create({ card: { borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 10 }, row: { flexDirection: "row", alignItems: "center", gap: 12 }, title: { fontSize: 15, fontWeight: "800", marginBottom: 3 }, percent: { fontSize: 19, fontWeight: "900" }, muted: { fontSize: 12, lineHeight: 18 }, track: { backgroundColor: "#8CA69A55", borderRadius: 8, height: 9, overflow: "hidden", marginVertical: 13 }, fill: { height: 9, borderRadius: 8 }, checkbox: { width: 25, height: 25, borderWidth: 1.5, borderRadius: 7, alignItems: "center", justifyContent: "center" }, check: { color: "#FFFFFF", fontWeight: "900" }
});
