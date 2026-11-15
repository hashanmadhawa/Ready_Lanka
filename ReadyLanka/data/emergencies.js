export const emergencies = [
  {
    id: "flood",
    title: "Flood",
    category: "Weather",
    emoji: "🌊",
    severity: "High",
    summary: "Move to higher ground and avoid floodwater.",
    preparation: ["Follow official warnings.", "Keep water, medicine, a torch and documents in a waterproof bag."],
    during: ["Move to higher ground.", "Never walk, swim or drive through floodwater.", "Stay away from fallen power lines."],
    after: ["Return only when authorities say it is safe.", "Avoid contaminated water and wet electrical equipment."]
  },
  {
    id: "fire",
    title: "House Fire",
    category: "Household",
    emoji: "🔥",
    severity: "Critical",
    summary: "Raise the alarm, evacuate and stay outside.",
    preparation: ["Keep exits clear.", "Agree on an outdoor family meeting point."],
    during: ["Get everyone outside immediately.", "Stay low under smoke.", "Never re-enter the building."],
    after: ["Stay outside until responders say it is safe.", "Get medical help for burns or smoke inhalation."]
  },
  {
    id: "storm",
    title: "Severe Storm",
    category: "Weather",
    emoji: "🌀",
    severity: "High",
    summary: "Secure loose objects and shelter indoors.",
    preparation: ["Monitor official weather bulletins.", "Bring loose objects indoors and charge phones."],
    during: ["Stay indoors and away from windows.", "Avoid trees, damaged buildings and power lines."],
    after: ["Wait for official confirmation before going outside.", "Report urgent hazards safely."]
  },
  {
    id: "earthquake",
    title: "Earthquake",
    category: "Geological",
    emoji: "🌍",
    severity: "High",
    summary: "Drop, cover and hold on during shaking.",
    preparation: ["Secure heavy objects.", "Identify safe places away from windows."],
    during: ["Drop, cover your head and neck, and hold on.", "Stay away from windows and do not use lifts."],
    after: ["Expect aftershocks.", "Leave damaged buildings and follow official instructions."]
  },
  {
    id: "landslide",
    title: "Landslide",
    category: "Geological",
    emoji: "⛰️",
    severity: "High",
    summary: "Leave unstable slopes and follow local warnings.",
    preparation: ["Watch for cracks, leaning trees and unusual water seepage.", "Plan a route away from unstable slopes."],
    during: ["Leave immediately if safe.", "Do not cross an active slide area."],
    after: ["Stay away because more movement may occur.", "Do not return until authorities confirm it is safe."]
  }
];

export const kitItems = [
  { id: "water", name: "Drinking water", detail: "Bottled or safely stored water" },
  { id: "food", name: "Ready-to-eat food", detail: "Non-perishable emergency food" },
  { id: "torch", name: "Torch and batteries", detail: "For power interruptions" },
  { id: "firstaid", name: "First-aid supplies", detail: "Basic first-aid kit" },
  { id: "medicine", name: "Essential medicines", detail: "Personal medicines and prescriptions" },
  { id: "documents", name: "Important documents", detail: "Copies in a waterproof pouch" },
  { id: "phone", name: "Phone and power bank", detail: "Keep devices charged" },
  { id: "radio", name: "Battery-powered radio", detail: "To receive official updates" }
];
