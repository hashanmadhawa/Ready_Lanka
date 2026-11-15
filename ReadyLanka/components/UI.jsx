import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function Page({ children, scroll = false, style }) {
  const { theme } = useTheme();
  const content = <View style={[styles.page, { backgroundColor: theme.background }, style]}>{children}</View>;
  return content;
}

export function SectionTitle({ title, subtitle }) {
  const { theme } = useTheme();
  return <View style={styles.section}><Text style={[styles.title, { color: theme.title }]}>{title}</Text><Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text></View>;
}

export function Button({ title, onPress, secondary = false }) {
  const { theme } = useTheme();
  return <Pressable accessibilityRole="button" onPress={onPress} style={[styles.button, { backgroundColor: secondary ? theme.soft : theme.primary }]}><Text style={[styles.buttonText, { color: secondary ? theme.primary : "#FFFFFF" }]}>{title}</Text></Pressable>;
}

export function Field({ value, onChangeText, placeholder, keyboardType }) {
  const { theme } = useTheme();
  return <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={theme.muted} keyboardType={keyboardType} style={[styles.field, { color: theme.text, backgroundColor: theme.uiBackground, borderColor: theme.border }]} />;
}

export function Card({ children, onPress, style }) {
  const { theme } = useTheme();
  const body = <View style={[styles.card, { backgroundColor: theme.uiBackground, borderColor: theme.border }, style]}>{children}</View>;
  return onPress ? <Pressable onPress={onPress}>{body}</Pressable> : body;
}

export const styles = StyleSheet.create({
  page: { flex: 1, padding: 18 },
  section: { marginBottom: 16 },
  title: { fontSize: 25, fontWeight: "800", marginBottom: 5 },
  subtitle: { fontSize: 13, lineHeight: 19 },
  button: { borderRadius: 12, padding: 14, alignItems: "center", marginBottom: 10 },
  buttonText: { fontSize: 15, fontWeight: "800" },
  field: { borderWidth: 1, borderRadius: 11, padding: 13, marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 15, padding: 14, marginBottom: 10, overflow: "hidden" },
  cardTitle: { fontSize: 15, fontWeight: "800" },
  muted: { fontSize: 12, lineHeight: 18 },
  listRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  emoji: { fontSize: 30 }
});
