import crypto from "crypto";

const store = {
  users: [],
  tasks: [],
  notes: [],
  aiHistory: []
};

export function createId() {
  return crypto.randomUUID();
}

export function publicUser(user) {
  return { 
    id: user.id || user._id.toString(), 
    name: user.name, 
    email: user.email,
    preferences: user.preferences || {
      goals: "",
      workStyle: "Focused",
      tone: "Professional",
      focusArea: "General",
      activeHours: "9 AM - 5 PM"
    }
  };
}

export const memoryStore = store;
