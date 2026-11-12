import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { emergencies, kitItems } from "./src/data/emergencies";

const colors = {
  green: "#176B52",
  dark: "#17352C",
  light: "#F4F7F5",
  white: "#FFFFFF",
  muted: "#6B7C75",
  border: "#E1E9E4",
  pale: "#E7F2EC"
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [query, setQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [section, setSection] = useState("preparation");
  const [checked, setChecked] = useState([]);

  const guides = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    if (!searchText) return emergencies;

    return emergencies.filter((item) =>
      `${item.title} ${item.category} ${item.summary}`
        .toLowerCase()
        .includes(searchText)
    );
  }, [query]);

  function openGuide(item) {
    setSelectedGuide(item);
    setSection("preparation");
  }

  function closeGuide() {
    setSelectedGuide(null);
  }

  function toggleKitItem(id) {
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  if (selectedGuide) {
    return (
      <GuideDetail
        item={selectedGuide}
        section={section}
        setSection={setSection}
        onBack={closeGuide}
      />
    );
  }

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <Header />

      <View style={styles.content}>
        {screen === "home" ? (
          <Home openGuides={() => setScreen("guides")} openGuide={openGuide} />
        ) : screen === "guides" ? (
          <Guides
            query={query}
            setQuery={setQuery}
            guides={guides}
            openGuide={openGuide}
          />
        ) : (
          <Kit checked={checked} toggle={toggleKitItem} />
        )}
      </View>

      <View style={styles.nav}>
        <NavButton
          icon="⌂"
          label="Home"
          active={screen === "home"}
          onPress={() => setScreen("home")}
        />
        <NavButton
          icon="▤"
          label="Guides"
          active={screen === "guides"}
          onPress={() => setScreen("guides")}
        />
        <NavButton
          icon="▣"
          label="Kit"
          active={screen === "kit"}
          onPress={() => setScreen("kit")}
        />
      </View>
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>
          Ready<Text style={styles.brandAccent}>Lanka</Text>
        </Text>
        <Text style={styles.overline}>OFFLINE SAFETY COMPANION</Text>
      </View>
      <Text style={styles.offline}>● Offline</Text>
    </View>
  );
}

function Home({ openGuides, openGuide }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.overlineLight}>OFFLINE EMERGENCY COMPANION</Text>
        <Text style={styles.heroTitle}>Be prepared.{"\n"}Stay safe.</Text>
        <Text style={styles.heroText}>
          Simple emergency guidance for you and your family.
        </Text>
        <Button title="Explore emergency guides" onPress={openGuides} />
      </View>

      <SectionTitle
        title="Emergency situations"
        subtitle="Choose a guide to learn what to do."
      />

      <View style={styles.grid}>
        {emergencies.slice(0, 4).map((item) => (
          <Pressable
            key={item.id}
            style={styles.category}
            onPress={() => openGuide(item)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.muted}>{item.category}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.note}>
        This first project milestone contains offline guides. The emergency kit,
        contacts and saved guides can be added in later commits.
      </Text>
    </ScrollView>
  );
}

function Guides({ query, setQuery, guides, openGuide }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <SectionTitle
        title="Emergency guides"
        subtitle="Search locally stored guidance."
      />

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search floods, fires, storms..."
        placeholderTextColor="#8B9992"
        style={styles.input}
      />

      {guides.map((item) => (
        <Pressable
          key={item.id}
          style={styles.listCard}
          onPress={() => openGuide(item)}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.muted}>{item.summary}</Text>
            <Text style={styles.meta}>
              {item.category} · {item.severity}
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}

      {guides.length === 0 && (
        <Text style={styles.empty}>No guides match your search.</Text>
      )}
    </ScrollView>
  );
}

function GuideDetail({ item, section, setSection, onBack }) {
  const content = item[section];

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back to guides</Text>
        </Pressable>

        <View style={styles.detailHero}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.heroTitleSmall}>{item.title}</Text>
          <Text style={styles.heroText}>{item.summary}</Text>
        </View>

        <View style={styles.segment}>
          {["preparation", "during", "after"].map((name) => (
            <Pressable
              key={name}
              style={[styles.segmentButton, section === name && styles.segmentActive]}
              onPress={() => setSection(name)}
            >
              <Text
                style={[
                  styles.segmentText,
                  section === name && styles.segmentTextActive
                ]}
              >
                {name[0].toUpperCase() + name.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.sectionHeading}>{section} an emergency</Text>
          {content.map((tip, index) => (
            <View key={tip} style={styles.tip}>
              <Text style={styles.number}>{index + 1}</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          Follow official instructions and seek professional help in an emergency.
        </Text>
      </ScrollView>
    </View>
  );
}

function Kit({ checked, toggle }) {
  const percent = Math.round((checked.length / kitItems.length) * 100);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <SectionTitle
        title="Emergency kit"
        subtitle="Check the supplies your household may need."
      />

      <View style={styles.whiteCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Preparation progress</Text>
          <Text style={styles.percent}>{percent}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.muted}>
          {checked.length} of {kitItems.length} checked
        </Text>
      </View>

      {kitItems.map((item) => {
        const done = checked.includes(item.id);

        return (
          <Pressable key={item.id} style={styles.listCard} onPress={() => toggle(item.id)}>
            <View style={[styles.checkbox, done && styles.checkboxDone]}>
              {done && <Text style={styles.check}>✓</Text>}
            </View>
            <View style={styles.cardBody}>
              <Text style={[styles.cardTitle, done && styles.strike]}>{item.name}</Text>
              <Text style={styles.muted}>{item.detail}</Text>
            </View>
          </Pressable>
        );
      })}

      <Text style={styles.note}>
        This checklist is stored only in memory for this commit. Persistence will be added later.
      </Text>
    </ScrollView>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.pageTitle}>{title}</Text>
      <Text style={styles.muted}>{subtitle}</Text>
    </View>
  );
}

function Button({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function NavButton({ icon, label, active, onPress }) {
  return (
    <Pressable style={styles.navItem} onPress={onPress}>
      <Text style={[styles.navIcon, active && styles.active]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.active]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.light },
  content: { flex: 1 },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 14,
    paddingBottom: 11,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  brand: { color: colors.dark, fontSize: 21, fontWeight: "900" },
  brandAccent: { color: colors.green },
  overline: { color: colors.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginTop: 2 },
  offline: { color: colors.green, backgroundColor: colors.pale, borderRadius: 20, padding: 7, fontSize: 11, fontWeight: "800" },
  page: { padding: 18, paddingBottom: 30 },
  hero: { backgroundColor: colors.dark, borderRadius: 22, padding: 22, marginBottom: 24 },
  detailHero: { backgroundColor: colors.dark, borderRadius: 20, padding: 20, marginBottom: 16 },
  overlineLight: { color: "#A8D4BE", fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  heroTitle: { color: colors.white, fontSize: 32, lineHeight: 38, fontWeight: "900", marginTop: 12 },
  heroTitleSmall: { color: colors.white, fontSize: 27, fontWeight: "900", marginTop: 8 },
  heroText: { color: "#D6E6DD", fontSize: 14, lineHeight: 21, marginTop: 9, marginBottom: 17 },
  sectionTitle: { marginBottom: 15 },
  pageTitle: { color: colors.dark, fontSize: 25, fontWeight: "800", marginBottom: 5 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 15 },
  category: { width: "48%", backgroundColor: colors.white, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 15, marginBottom: 12 },
  emoji: { fontSize: 30, marginBottom: 8 },
  cardTitle: { color: colors.dark, fontSize: 15, fontWeight: "800", marginBottom: 3 },
  muted: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  meta: { color: colors.green, fontSize: 11, fontWeight: "800", marginTop: 6 },
  button: { backgroundColor: colors.green, borderRadius: 12, padding: 14, alignItems: "center" },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  note: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 12, marginBottom: 18 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 13, marginBottom: 16, color: colors.dark },
  listCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 },
  cardBody: { flex: 1 },
  arrow: { color: colors.muted, fontSize: 28 },
  empty: { color: colors.muted, textAlign: "center", padding: 24 },
  back: { color: colors.green, fontWeight: "800", marginBottom: 16 },
  segment: { flexDirection: "row", backgroundColor: "#E8EFEB", borderRadius: 12, padding: 4, marginBottom: 16 },
  segmentButton: { flex: 1, alignItems: "center", padding: 10, borderRadius: 9 },
  segmentActive: { backgroundColor: colors.green },
  segmentText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  segmentTextActive: { color: colors.white },
  whiteCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  percent: { color: colors.green, fontSize: 19, fontWeight: "900" },
  track: { backgroundColor: "#E8EFEB", borderRadius: 8, height: 9, overflow: "hidden", marginVertical: 13 },
  fill: { backgroundColor: colors.green, height: 9, borderRadius: 8 },
  checkbox: { width: 25, height: 25, borderWidth: 1.5, borderColor: "#AAB9B1", borderRadius: 7, alignItems: "center", justifyContent: "center" },
  checkboxDone: { backgroundColor: colors.green, borderColor: colors.green },
  check: { color: colors.white, fontWeight: "900" },
  strike: { color: colors.muted, textDecorationLine: "line-through" },
  sectionHeading: { color: colors.dark, fontSize: 17, fontWeight: "800", marginBottom: 14 },
  tip: { flexDirection: "row", marginBottom: 14, alignItems: "flex-start" },
  number: { backgroundColor: colors.pale, color: colors.green, borderRadius: 15, width: 28, height: 28, textAlign: "center", paddingTop: 5, fontWeight: "900", marginRight: 10 },
  tipText: { color: colors.dark, flex: 1, fontSize: 14, lineHeight: 21 },
  nav: { flexDirection: "row", backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, paddingBottom: 9 },
  navItem: { flex: 1, alignItems: "center" },
  navIcon: { color: "#8A9991", fontSize: 19, marginBottom: 2 },
  navLabel: { color: "#8A9991", fontSize: 9, fontWeight: "700" },
  active: { color: colors.green }
});
