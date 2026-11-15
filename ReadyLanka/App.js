import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { emergencies, kitItems } from "./src/data/emergencies";
import {
  loadChecklist,
  loadContacts,
  loadFavorites,
  saveChecklist,
  saveContacts,
  saveFavorites
} from "./src/storage/storage";

const colors = {
  green: "#176B52",
  dark: "#17352C",
  light: "#F4F7F5",
  white: "#FFFFFF",
  muted: "#6B7C75",
  border: "#E1E9E4",
  pale: "#E7F2EC",
  red: "#C94D4D"
};

const tabs = [
  ["home", "Home", "⌂"],
  ["guides", "Guides", "▤"],
  ["kit", "Kit", "▣"],
  ["contacts", "Contacts", "☎"],
  ["saved", "Saved", "★"]
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [detailSection, setDetailSection] = useState("preparation");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [checked, setChecked] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([loadFavorites(), loadChecklist(), loadContacts()]).then(([saved, done, people]) => {
      setFavorites(saved);
      setChecked(done);
      setContacts(people);
      setReady(true);
    });
  }, []);

  const filteredGuides = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return emergencies;
    return emergencies.filter((item) =>
      `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(text)
    );
  }, [query]);

  function openGuide(item) {
    setSelectedGuide(item);
    setDetailSection("preparation");
  }

  function toggleFavorite(id) {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    saveFavorites(next);
  }

  function toggleKitItem(id) {
    const next = checked.includes(id)
      ? checked.filter((item) => item !== id)
      : [...checked, id];
    setChecked(next);
    saveChecklist(next);
  }

  function addContact() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Missing information", "Enter a name and phone number.");
      return;
    }
    const contact = {
      id: String(Date.now()),
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship.trim()
    };
    const next = [...contacts, contact];
    setContacts(next);
    saveContacts(next);
    setName("");
    setPhone("");
    setRelationship("");
  }

  function removeContact(contact) {
    Alert.alert("Delete contact?", `Remove ${contact.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const next = contacts.filter((item) => item.id !== contact.id);
          setContacts(next);
          saveContacts(next);
        }
      }
    ]);
  }

  if (!ready) {
    return <View style={styles.loading}><ActivityIndicator size="large" color={colors.green} /><Text style={styles.muted}>Loading saved data…</Text></View>;
  }

  if (selectedGuide) {
    return <GuideDetail item={selectedGuide} section={detailSection} setSection={setDetailSection} favorite={favorites.includes(selectedGuide.id)} onFavorite={() => toggleFavorite(selectedGuide.id)} onBack={() => setSelectedGuide(null)} />;
  }

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View><Text style={styles.brand}>Ready<Text style={{ color: colors.green }}>Lanka</Text></Text><Text style={styles.overline}>OFFLINE SAFETY COMPANION</Text></View>
        <Text style={styles.offline}>● Offline</Text>
      </View>
      <View style={styles.content}>
        {screen === "home" && <Home openScreen={setScreen} openGuide={openGuide} />}
        {screen === "guides" && <Guides query={query} setQuery={setQuery} guides={filteredGuides} openGuide={openGuide} />}
        {screen === "kit" && <Kit checked={checked} toggle={toggleKitItem} />}
        {screen === "contacts" && <Contacts contacts={contacts} name={name} phone={phone} relationship={relationship} setName={setName} setPhone={setPhone} setRelationship={setRelationship} addContact={addContact} removeContact={removeContact} />}
        {screen === "saved" && <Saved favorites={favorites} openGuide={openGuide} />}
      </View>
      <View style={styles.nav}>{tabs.map(([id, label, icon]) => <Pressable key={id} style={styles.navItem} onPress={() => setScreen(id)}><Text style={[styles.navIcon, screen === id && styles.active]}>{icon}</Text><Text style={[styles.navLabel, screen === id && styles.active]}>{label}</Text></Pressable>)}</View>
    </View>
  );
}

function Home({ openScreen, openGuide }) {
  return <ScrollView contentContainerStyle={styles.page}>
    <View style={styles.hero}><Text style={styles.overlineLight}>OFFLINE EMERGENCY COMPANION</Text><Text style={styles.heroTitle}>Be prepared.{"\n"}Stay safe.</Text><Text style={styles.heroText}>Simple emergency guidance for you and your family.</Text><Button title="Explore guides" onPress={() => openScreen("guides")} /></View>
    <SectionTitle title="Emergency situations" subtitle="Choose a guide to learn what to do." />
    <View style={styles.grid}>{emergencies.slice(0, 4).map((item) => <Pressable key={item.id} style={styles.category} onPress={() => openGuide(item)}><Text style={styles.emoji}>{item.emoji}</Text><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.muted}>{item.category}</Text></Pressable>)}</View>
    <SectionTitle title="Quick access" subtitle="Useful preparation tools." />
    <Button title="🎒  Open emergency kit" secondary onPress={() => openScreen("kit")} />
    <Button title="☎  Manage contacts" secondary onPress={() => openScreen("contacts")} />
    <Text style={styles.note}>Educational guidance only. Always follow current instructions from official emergency authorities.</Text>
  </ScrollView>;
}

function Guides({ query, setQuery, guides, openGuide }) {
  return <ScrollView contentContainerStyle={styles.page}><SectionTitle title="Emergency guides" subtitle="Search locally stored guidance." /><TextInput value={query} onChangeText={setQuery} placeholder="Search floods, fires, storms..." placeholderTextColor="#8B9992" style={styles.input} />{guides.map((item) => <Pressable key={item.id} style={styles.listCard} onPress={() => openGuide(item)}><Text style={styles.emoji}>{item.emoji}</Text><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.muted}>{item.summary}</Text><Text style={styles.meta}>{item.category} · {item.severity}</Text></View><Text style={styles.arrow}>›</Text></Pressable>)}{guides.length === 0 && <Text style={styles.empty}>No guides match your search.</Text>}</ScrollView>;
}

function GuideDetail({ item, section, setSection, favorite, onFavorite, onBack }) {
  const content = item[section];
  return <View style={styles.app}><ScrollView contentContainerStyle={styles.page}><Pressable onPress={onBack}><Text style={styles.back}>‹ Back to guides</Text></Pressable><View style={styles.detailHero}><Text style={styles.emoji}>{item.emoji}</Text><Text style={styles.heroTitleSmall}>{item.title}</Text><Text style={styles.heroText}>{item.summary}</Text></View><Button title={favorite ? "★  Saved guide" : "☆  Save guide"} secondary onPress={onFavorite} /><View style={styles.segment}>{["preparation", "during", "after"].map((name) => <Pressable key={name} style={[styles.segmentButton, section === name && styles.segmentActive]} onPress={() => setSection(name)}><Text style={[styles.segmentText, section === name && styles.segmentTextActive]}>{name[0].toUpperCase() + name.slice(1)}</Text></Pressable>)}</View><View style={styles.whiteCard}><Text style={styles.sectionHeading}>{section} an emergency</Text>{content.map((tip, index) => <View key={tip} style={styles.tip}><Text style={styles.number}>{index + 1}</Text><Text style={styles.tipText}>{tip}</Text></View>)}</View><Text style={styles.note}>Follow official instructions and seek professional help in an emergency.</Text></ScrollView></View>;
}

function Kit({ checked, toggle }) {
  const percent = Math.round((checked.length / kitItems.length) * 100);
  return <ScrollView contentContainerStyle={styles.page}><SectionTitle title="Emergency kit" subtitle="Check the supplies your household may need." /><View style={styles.whiteCard}><View style={styles.rowBetween}><Text style={styles.cardTitle}>Preparation progress</Text><Text style={styles.percent}>{percent}%</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /></View><Text style={styles.muted}>{checked.length} of {kitItems.length} checked</Text></View>{kitItems.map((item) => { const done = checked.includes(item.id); return <Pressable key={item.id} style={styles.listCard} onPress={() => toggle(item.id)}><View style={[styles.checkbox, done && styles.checkboxDone]}>{done && <Text style={styles.check}>✓</Text>}</View><View style={{ flex: 1 }}><Text style={[styles.cardTitle, done && styles.strike]}>{item.name}</Text><Text style={styles.muted}>{item.detail}</Text></View></Pressable>; })}<Text style={styles.note}>Adjust this list for your household, local risks and individual needs.</Text></ScrollView>;
}

function Contacts({ contacts, name, phone, relationship, setName, setPhone, setRelationship, addContact, removeContact }) {
  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}><ScrollView contentContainerStyle={styles.page}><SectionTitle title="Emergency contacts" subtitle="Save trusted contacts on this device." /><View style={styles.whiteCard}><Text style={styles.sectionHeading}>Add a contact</Text><TextInput value={name} onChangeText={setName} placeholder="Name *" style={styles.input} /><TextInput value={phone} onChangeText={setPhone} placeholder="Phone number *" keyboardType="phone-pad" style={styles.input} /><TextInput value={relationship} onChangeText={setRelationship} placeholder="Relationship (optional)" style={styles.input} /><Button title="Save contact" onPress={addContact} /></View><Text style={styles.sectionHeading}>Saved contacts ({contacts.length})</Text>{contacts.map((contact) => <View key={contact.id} style={styles.listCard}><Pressable style={{ flex: 1 }} onPress={() => Linking.openURL(`tel:${contact.phone}`)}><Text style={styles.cardTitle}>{contact.name}</Text><Text style={styles.muted}>{contact.phone}</Text>{contact.relationship ? <Text style={styles.meta}>{contact.relationship}</Text> : null}</Pressable><Pressable onPress={() => removeContact(contact)}><Text style={styles.delete}>Delete</Text></Pressable></View>)}{contacts.length === 0 && <Text style={styles.empty}>No contacts saved yet.</Text>}<Text style={styles.note}>Tap a contact to call. Verify official emergency numbers independently.</Text></ScrollView></KeyboardAvoidingView>;
}

function Saved({ favorites, openGuide }) {
  const saved = emergencies.filter((item) => favorites.includes(item.id));
  return <ScrollView contentContainerStyle={styles.page}><SectionTitle title="Saved guides" subtitle="Your favorite guides are available offline." />{saved.map((item) => <Pressable key={item.id} style={styles.listCard} onPress={() => openGuide(item)}><Text style={styles.emoji}>{item.emoji}</Text><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.muted}>{item.summary}</Text></View><Text style={styles.star}>★</Text></Pressable>)}{saved.length === 0 && <Text style={styles.empty}>No saved guides yet. Open a guide and tap Save guide.</Text>}</ScrollView>;
}

function SectionTitle({ title, subtitle }) { return <View style={styles.sectionTitle}><Text style={styles.pageTitle}>{title}</Text><Text style={styles.muted}>{subtitle}</Text></View>; }
function Button({ title, onPress, secondary = false }) { return <Pressable onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Text style={[styles.buttonText, secondary && styles.buttonSecondaryText]}>{title}</Text></Pressable>; }

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.light },
  content: { flex: 1 },
  loading: { flex: 1, backgroundColor: colors.light, alignItems: "center", justifyContent: "center", gap: 12 },
  header: { backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border, paddingTop: 14, paddingBottom: 11, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brand: { color: colors.dark, fontSize: 21, fontWeight: "900" },
  overline: { color: colors.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginTop: 2 },
  offline: { color: colors.green, backgroundColor: colors.pale, borderRadius: 20, padding: 7, fontSize: 11, fontWeight: "800" },
  page: { padding: 18, paddingBottom: 30 },
  hero: { backgroundColor: colors.dark, borderRadius: 22, padding: 22, marginBottom: 24 },
  detailHero: { backgroundColor: colors.dark, borderRadius: 20, padding: 20, marginBottom: 14 },
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
  button: { backgroundColor: colors.green, borderRadius: 12, padding: 14, alignItems: "center", marginBottom: 10 },
  buttonSecondary: { backgroundColor: colors.pale },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  buttonSecondaryText: { color: colors.green },
  note: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 12, marginBottom: 18 },
  input: { backgroundColor: "#F8FAF9", borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 10, color: colors.dark },
  listCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 },
  whiteCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, marginBottom: 14 },
  arrow: { color: colors.muted, fontSize: 28 },
  empty: { color: colors.muted, textAlign: "center", padding: 24, lineHeight: 21 },
  back: { color: colors.green, fontWeight: "800", marginBottom: 16 },
  segment: { flexDirection: "row", backgroundColor: "#E8EFEB", borderRadius: 12, padding: 4, marginVertical: 16 },
  segmentButton: { flex: 1, alignItems: "center", padding: 10, borderRadius: 9 },
  segmentActive: { backgroundColor: colors.green },
  segmentText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  segmentTextActive: { color: colors.white },
  sectionHeading: { color: colors.dark, fontSize: 17, fontWeight: "800", marginBottom: 14 },
  tip: { flexDirection: "row", marginBottom: 14, alignItems: "flex-start" },
  number: { backgroundColor: colors.pale, color: colors.green, borderRadius: 15, width: 28, height: 28, textAlign: "center", paddingTop: 5, fontWeight: "900", marginRight: 10 },
  tipText: { color: colors.dark, flex: 1, fontSize: 14, lineHeight: 21 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  percent: { color: colors.green, fontSize: 19, fontWeight: "900" },
  track: { backgroundColor: "#E8EFEB", borderRadius: 8, height: 9, overflow: "hidden", marginVertical: 13 },
  fill: { backgroundColor: colors.green, height: 9, borderRadius: 8 },
  checkbox: { width: 25, height: 25, borderWidth: 1.5, borderColor: "#AAB9B1", borderRadius: 7, alignItems: "center", justifyContent: "center" },
  checkboxDone: { backgroundColor: colors.green, borderColor: colors.green },
  check: { color: colors.white, fontWeight: "900" },
  strike: { color: colors.muted, textDecorationLine: "line-through" },
  delete: { color: colors.red, fontWeight: "800", padding: 5 },
  star: { color: "#E6A23C", fontSize: 22 },
  nav: { flexDirection: "row", backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, paddingBottom: 9 },
  navItem: { flex: 1, alignItems: "center" },
  navIcon: { color: "#8A9991", fontSize: 19, marginBottom: 2 },
  navLabel: { color: "#8A9991", fontSize: 9, fontWeight: "700" },
  active: { color: colors.green }
});
