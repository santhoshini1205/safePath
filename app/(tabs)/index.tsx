import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  // UPDATED: Now navigates to the Routes page instead of external Maps
  const handleFindRoute = (destinationOverride?: string) => {
    const target = (destinationOverride || searchText || "Indiranagar").trim();

    // Navigate to /routes and pass the destination as a query parameter
    router.push({
      pathname: "/routes",
      params: { destination: target },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#05070F" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 22,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "#00E5FF",
                fontSize: 13,
                fontWeight: "700",
                letterSpacing: 2,
              }}
            >
              SAFEPATH
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 34,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              Where to?
            </Text>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: "#0B1630",
              borderRadius: 22,
              paddingHorizontal: 18,
              paddingVertical: 14,
              borderWidth: 1,
              borderColor: "rgba(0,229,255,0.15)",
            }}
          >
            <TextInput
              placeholder="Search destination..."
              placeholderTextColor="rgba(255,255,255,0.35)"
              value={searchText}
              onChangeText={setSearchText}
              style={{ color: "white", fontSize: 16 }}
            />
          </View>
        </View>

        {/* FIND ROUTE BUTTON - Now points to internal Routes screen */}
        <View style={{ paddingHorizontal: 20, marginBottom: 35 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleFindRoute()}
            style={{
              backgroundColor: "#00E5FF",
              borderRadius: 24,
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#00E5FF",
              shadowOpacity: 0.8,
              shadowRadius: 18,
            }}
          >
            <Text
              style={{ color: "#05070F", fontSize: 20, fontWeight: "bold" }}
            >
              Find Safest Route
            </Text>
          </TouchableOpacity>
        </View>

        {/* RECENT DESTINATIONS */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              fontWeight: "700",
              marginBottom: 18,
            }}
          >
            RECENT DESTINATIONS
          </Text>
          {[
            { place: "80 Feet Road", score: "8.1", color: "#39FF14" },
            { place: "CMH Road", score: "7.2", color: "#39FF14" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              onPress={() => handleFindRoute(item.place)}
              style={{
                backgroundColor: "#091225",
                borderRadius: 22,
                padding: 20,
                marginBottom: 14,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {item.place}
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                  Indiranagar, BLR
                </Text>
              </View>
              <Text
                style={{ color: item.color, fontSize: 26, fontWeight: "bold" }}
              >
                {item.score}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
