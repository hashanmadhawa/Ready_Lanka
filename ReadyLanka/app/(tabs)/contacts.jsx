import React, { useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppData } from "../../contexts/AppDataContext";
import { Button, Card, Field, Page, SectionTitle } from "../../components/UI";

export default function Contacts() {
  const { theme } = useTheme();
  const { contacts, addContact, removeContact } = useAppData();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  function submit() {
    if (!name.trim() || !phone.trim()) return Alert.alert("Missing information", "Enter a name and phone number.");
    addContact({ id: String(Date.now()), name: name.trim(), phone: phone.trim(), relationship: relationship.trim() });
    setName(""); setPhone(""); setRelationship("");
  }
  function confirmDelete(contact) { Alert.alert("Delete contact?", `Remove ${contact.name}?`, [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => removeContact(contact.id) }]); }
  return <Page><ScrollView><SectionTitle title="Emergency contacts" subtitle="Save trusted contacts on this device." /><Card><Text style={[styles.heading, { color: theme.text }]}>Add a contact</Text><Field value={name} onChangeText={setName} placeholder="Name *" /><Field value={phone} onChangeText={setPhone} placeholder="Phone number *" keyboardType="phone-pad" /><Field value={relationship} onChangeText={setRelationship} placeholder="Relationship (optional)" /><Button title="Save contact" onPress={submit} /></Card><Text style={[styles.heading, { color: theme.text }]}>Saved contacts ({contacts.length})</Text>{contacts.map((contact) => <Card key={contact.id} style={styles.contact}><Pressable style={{ flex: 1 }} onPress={() => Linking.openURL(`tel:${contact.phone}`)}><Text style={[styles.name, { color: theme.text }]}>{contact.name}</Text><Text style={[styles.muted, { color: theme.muted }]}>{contact.phone}</Text>{contact.relationship ? <Text style={[styles.meta, { color: theme.primary }]}>{contact.relationship}</Text> : null}</Pressable><Pressable onPress={() => confirmDelete(contact)}><Text style={styles.delete}>Delete</Text></Pressable></Card>)}{contacts.length === 0 && <Text style={[styles.empty, { color: theme.muted }]}>No contacts saved yet.</Text>}</ScrollView></Page>;
}

const styles = StyleSheet.create({ heading: { fontSize: 17, fontWeight: "800", marginBottom: 14 }, contact: { flexDirection: "row", alignItems: "center" }, name: { fontSize: 15, fontWeight: "800" }, muted: { fontSize: 12, lineHeight: 18 }, meta: { fontSize: 11, fontWeight: "800", marginTop: 5 }, delete: { color: "#D45A5A", fontWeight: "800", padding: 5 }, empty: { textAlign: "center", padding: 24 }
});
