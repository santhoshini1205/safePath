import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SOSScreen() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [activated, setActivated] = useState(false);

  const contacts = [
    { name: "Mom", emoji: "👩" },
    { name: "Dad", emoji: "👨" },
    { name: "Bro", emoji: "👨" },
  ];

  // UPDATED: Localized to MG Road, Bangalore
  const safeZones = [
    {
      icon: "🚔",
      name: "Cubbon Park Police Station",
      type: "Police",
      distance: "0.6 km",
      color: "#00E5FF",
    },
    {
      icon: "🏥",
      name: "St. Philomena's Hospital",
      type: "Hospital",
      distance: "1.2 km",
      color: "#39FF14",
    },
    {
      icon: "🚒",
      name: "Mayo Hall Fire Station",
      type: "Fire Station",
      distance: "0.4 km",
      color: "#FFE600",
    },
    {
      icon: "🏠",
      name: "Garuda Mall (Safe Haven)",
      type: "Public Space",
      distance: "0.7 km",
      color: "#00E5FF",
    },
  ];

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setActivated(true);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => (prev ? prev - 1 : 0));
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handlePress = () => {
    if (!activated && countdown === null) {
      setCountdown(3);
    }
  };

  const cancelSOS = () => {
    setCountdown(null);
    setActivated(false);
  };

  const openNavigation = (destination: string) => {
    // Appends "Bangalore" to ensure the search is localized
    const query = encodeURIComponent(`${destination}, Bangalore`);
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${query}`,
      android: `${scheme}${query}`,
    });

    if (url) {
      Linking.openURL(url).catch(() => {
        alert("Could not open maps application");
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#05070F" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 120,
        }}
      >
        <Text
          style={{
            color: "#FF1744",
            fontSize: 13,
            fontWeight: "700",
            letterSpacing: 2,
          }}
        >
          EMERGENCY
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 34,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 35,
          }}
        >
          SOS Center
        </Text>

        {/* SOS BUTTON */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.9}
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: activated ? "#FF1744" : "rgba(255,23,68,0.15)",
              borderWidth: 4,
              borderColor: "#FF1744",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#FF1744",
              shadowOpacity: 0.9,
              shadowRadius: 25,
            }}
          >
            <Text style={{ fontSize: 42 }}>🛡️</Text>
            <Text
              style={{
                color: activated ? "white" : "#FF1744",
                fontSize: 38,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              {countdown !== null && !activated ? countdown : "SOS"}
            </Text>
            <Text
              style={{
                color: activated
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,23,68,0.7)",
                marginTop: 8,
                fontWeight: "600",
              }}
            >
              {activated
                ? "HELP SENT"
                : countdown !== null
                  ? "Sending..."
                  : "Click to Alert"}
            </Text>
          </TouchableOpacity>

          {(countdown !== null || activated) && (
            <TouchableOpacity
              onPress={cancelSOS}
              style={{
                marginTop: 24,
                backgroundColor: "#111827",
                paddingHorizontal: 28,
                paddingVertical: 14,
                borderRadius: 18,
              }}
            >
              <Text style={{ color: "#D1D5DB", fontWeight: "bold" }}>
                {activated ? "Reset SOS" : "Cancel"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LOCATION VIEW */}
        <View
          style={{
            backgroundColor: "#0B1730",
            borderRadius: 24,
            padding: 20,
            marginBottom: 28,
            borderWidth: 1,
            borderColor: "rgba(0,229,255,0.18)",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: "rgba(0,229,255,0.15)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>📍</Text>
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ color: "#7C8CA5", marginBottom: 6 }}>
              Live Location
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              MG Road, Bangalore
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "rgba(57,255,20,0.15)",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: "#39FF14", fontWeight: "bold" }}>LIVE</Text>
          </View>
        </View>

        {/* CONTACTS */}
        <Text
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 2,
            marginBottom: 14,
          }}
        >
          EMERGENCY CONTACTS
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          {contacts.map((contact, index) => (
            <View
              key={index}
              style={{
                width: "31%",
                backgroundColor: activated ? "rgba(57,255,20,0.08)" : "#0B1730",
                borderRadius: 22,
                paddingVertical: 20,
                alignItems: "center",
                borderWidth: 1,
                borderColor: activated ? "#39FF14" : "rgba(255,255,255,0.06)",
              }}
            >
              <Text style={{ fontSize: 34 }}>{contact.emoji}</Text>
              <Text
                style={{ color: "white", fontWeight: "bold", marginTop: 10 }}
              >
                {contact.name}
              </Text>
              {activated && (
                <Text
                  style={{
                    color: "#39FF14",
                    marginTop: 6,
                    fontSize: 11,
                    fontWeight: "bold",
                  }}
                >
                  ALERTED
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* SAFE ZONES - BANGALORE LOCATIONS */}
        <Text
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          NEARBY SAFE ZONES (BANGALORE)
        </Text>
        {safeZones.map((zone, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#0B1730",
              borderRadius: 22,
              padding: 18,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 28 }}>{zone.icon}</Text>
                <View style={{ marginLeft: 14 }}>
                  <Text
                    style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                  >
                    {zone.name}
                  </Text>
                  <Text style={{ color: "#7C8CA5", marginTop: 2 }}>
                    {zone.type} • {zone.distance}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => openNavigation(zone.name)}
                style={{
                  backgroundColor: "rgba(0,229,255,0.1)",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#00E5FF",
                }}
              >
                <Text style={{ color: "#00E5FF", fontWeight: "bold" }}>
                  Navigate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
