import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabsLayout() {
  const { scheme, theme, toggleTheme } = useTheme();

  return <View style={[styles.container, { backgroundColor: theme.background }]}>
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: theme.navBackground },
      headerTintColor: theme.title,
      headerTitleStyle: { fontWeight: "800" },
      headerRight: () => <Pressable onPress={toggleTheme} hitSlop={10} style={styles.toggle}><Image source={scheme === "dark" ? require("../../assets/img/light.png") : require("../../assets/img/dark.png")} style={styles.toggleIcon} /></Pressable>,
      tabBarStyle: { backgroundColor: theme.navBackground, borderTopColor: theme.border },
      tabBarActiveTintColor: theme.iconColorFocused,
      tabBarInactiveTintColor: theme.iconColor
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="guides" options={{ title: "Guides", tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} /> }} />
      <Tabs.Screen name="kit" options={{ title: "Kit", tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" size={size} color={color} /> }} />
      <Tabs.Screen name="contacts" options={{ title: "Contacts", tabBarIcon: ({ color, size }) => <Ionicons name="call" size={size} color={color} /> }} />
      <Tabs.Screen name="saved" options={{ title: "Saved", tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} /> }} />
    </Tabs>
    <View style={[styles.footer, { backgroundColor: theme.navBackground, borderTopColor: theme.border }]}><Text style={{ color: theme.muted, fontSize: 11 }}>ReadyLanka · Offline safety companion</Text></View>
  </View>;
}

const styles = StyleSheet.create({ container: { flex: 1 }, toggle: { marginRight: 16 }, toggleIcon: { width: 25, height: 25, resizeMode: "contain" }, footer: { padding: 8, alignItems: "center", borderTopWidth: 1 } });
