import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportScreen() {
  const [selected, setSelected] = useState("Poor Lighting");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const reports = [
    "Poor Lighting",
    "Suspicious Activity",
    "Harassment",
    "Road Accident",
    "Unsafe Area",
  ];

  // IMAGE PICKER LOGIC
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera roll permissions to upload photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // SUBMIT REPORT WITH COMMUNITY FEEDBACK
  const submitReport = () => {
    if (!description.trim()) {
      Alert.alert(
        "Missing Description",
        "Please describe the incident to help the community.",
      );
      return;
    }

    Alert.alert(
      "Report Submitted",
      `Thank you for your contribution! \n\nFurther users will be rerouted according to your report and credibility score.`,
      [
        {
          text: "Great",
          onPress: () => {
            setDescription("");
            setPhoto(null);
            setSelected("Poor Lighting");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <Text style={styles.subHeader}>COMMUNITY REPORT</Text>
        <Text style={styles.mainHeader}>Report Incident</Text>

        {/* LOCATION CARD */}
        <View style={styles.locationCard}>
          <Text style={styles.labelSmall}>Current Location</Text>
          <Text style={styles.locationText}>📍 MG Road, Bangalore</Text>
        </View>

        {/* INCIDENT TYPE SELECTION */}
        <Text style={styles.sectionTitle}>Select Incident Type</Text>
        <View style={styles.grid}>
          {reports.map((item, index) => {
            const active = selected === item;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                onPress={() => setSelected(item)}
                style={[styles.gridItem, active && styles.gridItemActive]}
              >
                <Text
                  style={[styles.gridText, active && styles.gridTextActive]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DESCRIPTION INPUT */}
        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="Describe what happened..."
          placeholderTextColor="#6B7280"
          style={styles.textArea}
        />

        {/* ATTACH PHOTO */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={pickImage}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>
            {photo ? "📸 Change Photo" : "📷 Attach Photo"}
          </Text>
        </TouchableOpacity>

        {/* PREVIEW IMAGE */}
        {photo && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
          </View>
        )}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={submitReport}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05070F",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 120,
  },
  subHeader: {
    color: "#00E5FF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },
  mainHeader: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
  },
  locationCard: {
    backgroundColor: "#0B1730",
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0,229,255,0.12)",
  },
  labelSmall: {
    color: "#7C8CA5",
    fontSize: 14,
    marginBottom: 8,
  },
  locationText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#0B1730",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.06)",
  },
  gridItemActive: {
    backgroundColor: "rgba(0,229,255,0.15)",
    borderColor: "#00E5FF",
  },
  gridText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  gridTextActive: {
    color: "#00E5FF",
  },
  textArea: {
    backgroundColor: "#0B1730",
    borderRadius: 24,
    padding: 20,
    height: 150,
    color: "white",
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0,229,255,0.12)",
  },
  uploadButton: {
    backgroundColor: "#111827",
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#00E5FF",
  },
  uploadButtonText: {
    color: "#00E5FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  previewContainer: {
    marginBottom: 28,
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#00E5FF",
  },
  submitButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#00E5FF",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  submitButtonText: {
    color: "#04111F",
    fontSize: 20,
    fontWeight: "bold",
  },
});
