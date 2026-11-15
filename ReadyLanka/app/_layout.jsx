import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { AppDataProvider, useAppData } from "../contexts/AppDataContext";

function RootContent() {
  const { scheme, theme } = useTheme();
  const { ready } = useAppData();

  if (!ready) {
    return <View style={[styles.loading, { backgroundColor: theme.background }]}><ActivityIndicator size="large" color={theme.primary} /><Text style={{ color: theme.muted, marginTop: 10 }}>Loading ReadyLanka…</Text></View>;
  }

  return <View style={{ flex: 1 }}>
    <StatusBar style={scheme === "dark" ? "light" : "dark"} />
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.navBackground }, headerTintColor: theme.title, headerTitleStyle: { fontWeight: "800" } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="guide/[id]" options={{ title: "Guide" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  </View>;
}

export default function RootLayout() {
  return <ThemeProvider><AppDataProvider><RootContent /></AppDataProvider></ThemeProvider>;
}

const styles = StyleSheet.create({ loading: { flex: 1, alignItems: "center", justifyContent: "center" } });
