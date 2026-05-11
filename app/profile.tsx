import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  // --- STATE ---
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [liveLocation, setLiveLocation] = useState(true);
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");
  const [name, setName] = useState("SafePath User");
  const [email, setEmail] = useState("user@safepath.app");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  // --- HANDLERS ---
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      Alert.alert("Success", "Profile photo updated");
    }
  };

  const settingsOptions = [
    {
      icon: "🛡️",
      title: "Emergency Contacts",
      switchable: false,
    },
    {
      icon: "📍",
      title: "Live Location Sharing",
      switchable: true,
      value: liveLocation,
      setter: setLiveLocation,
    },
    {
      icon: "🌙",
      title: "Dark Theme",
      switchable: true,
      value: darkTheme,
      setter: setDarkTheme,
    },
    {
      icon: "🔔",
      title: "Notifications",
      switchable: true,
      value: notifications,
      setter: setNotifications,
    },
    {
      icon: "⚙️",
      title: "App Settings",
      switchable: false,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* PROFILE HEADER */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
            <Image source={{ uri: profileImage }} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={styles.tapHint}>Tap image to change</Text>

          {/* NAME EDITING */}
          {editingName ? (
            <TextInput
              value={name}
              onChangeText={setName}
              autoFocus
              placeholder="Enter name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              style={styles.inputActive}
              onSubmitEditing={() => {
                setEditingName(false);
                Alert.alert("Updated", "Name changed successfully");
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => setEditingName(true)}>
              <Text style={styles.userName}>{name}</Text>
            </TouchableOpacity>
          )}

          {/* EMAIL EDITING */}
          {editingEmail ? (
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoFocus
              placeholder="Enter email"
              placeholderTextColor="rgba(255,255,255,0.3)"
              style={[styles.inputActive, styles.emailInput]}
              onSubmitEditing={() => {
                setEditingEmail(false);
                Alert.alert("Updated", "Email changed successfully");
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => setEditingEmail(true)}>
              <Text style={styles.userEmail}>{email}</Text>
            </TouchableOpacity>
          )}

          {/* CREDIBILITY SCORE */}
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>Credibility • 8.7</Text>
          </View>
        </View>

        {/* SETTINGS LIST */}
        {settingsOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => {
              if (!item.switchable) {
                Alert.alert(item.title, `${item.title} opened`);
              }
            }}
            style={styles.settingItem}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingIcon}>{item.icon}</Text>
              <Text style={styles.settingTitle}>{item.title}</Text>
            </View>

            {item.switchable ? (
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ false: "#444", true: "#00E5FF" }}
                thumbColor="#fff"
              />
            ) : (
              <Text style={styles.chevron}>›</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => Alert.alert("Logout", "Logged out successfully")}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05070F",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    marginBottom: 40, // Increased margin since stats are removed
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#00E5FF",
  },
  tapHint: {
    color: "#00E5FF",
    marginTop: 10,
    fontSize: 13,
  },
  userName: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  userEmail: {
    color: "rgba(255,255,255,0.45)",
    marginTop: 10,
    fontSize: 15,
  },
  inputActive: {
    marginTop: 20,
    backgroundColor: "#091225",
    color: "white",
    width: 240,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#00E5FF",
  },
  emailInput: {
    marginTop: 12,
    width: 260,
    fontSize: 16,
    fontWeight: "normal",
  },
  scoreBadge: {
    marginTop: 20,
    backgroundColor: "rgba(57,255,20,0.15)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(57,255,20,0.4)",
  },
  scoreText: {
    color: "#7CFF00",
    fontSize: 22,
    fontWeight: "bold",
  },
  settingItem: {
    backgroundColor: "#091225",
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 22,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  settingTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  chevron: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 22,
  },
  logoutBtn: {
    backgroundColor: "rgba(255,0,0,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,0,0,0.25)",
    paddingVertical: 20,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#FF4D4D",
    fontSize: 18,
    fontWeight: "bold",
  },
});
