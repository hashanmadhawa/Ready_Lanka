import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  loadChecklist,
  loadContacts,
  loadFavorites,
  saveChecklist,
  saveContacts,
  saveFavorites
} from "../storage/storage";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [checked, setChecked] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([loadFavorites(), loadChecklist(), loadContacts()]).then(([saved, done, people]) => {
      setFavorites(saved);
      setChecked(done);
      setContacts(people);
      setReady(true);
    });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      saveFavorites(next);
      return next;
    });
  };

  const toggleKitItem = (id) => {
    setChecked((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      saveChecklist(next);
      return next;
    });
  };

  const addContact = (contact) => {
    setContacts((current) => {
      const next = [...current, contact];
      saveContacts(next);
      return next;
    });
  };

  const removeContact = (id) => {
    setContacts((current) => {
      const next = current.filter((item) => item.id !== id);
      saveContacts(next);
      return next;
    });
  };

  const value = useMemo(
    () => ({ favorites, checked, contacts, ready, toggleFavorite, toggleKitItem, addContact, removeContact }),
    [favorites, checked, contacts, ready]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) throw new Error("useAppData must be used inside AppDataProvider");
  return value;
}
