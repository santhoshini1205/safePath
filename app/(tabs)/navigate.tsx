import { useLocalSearchParams } from "expo-router"; // Import this to get the data
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function NavigateScreen() {
  // 1. Get the route data from the previous screen
  const params = useLocalSearchParams();
  const routeData = params.routeData
    ? JSON.parse(params.routeData as string)
    : null;

  const [step, setStep] = useState(0);
  const [alertIndex, setAlertIndex] = useState(0);

  const instructions = [
    "Head south on MG Road",
    "Turn left onto Brigade Road",
    "Continue on Richmond Road",
    "Arrive at Koramangala",
  ];

  const alerts = [
    {
      color: "#FFE600",
      title: "Poor lighting ahead",
      distance: "200m",
      icon: "🔦",
    },
    {
      color: "#FF1744",
      title: "Low foot traffic",
      distance: "400m",
      icon: "⚠️",
    },
    {
      color: "#39FF14",
      title: "Safe crowded area",
      distance: "600m",
      icon: "👥",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAlertIndex((prev) => (prev + 1) % alerts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentAlert = alerts[alertIndex];

  // Use coordinates from routeData if available, otherwise fallback
  const routeCoordinates = routeData?.coordinates || [
    { latitude: 12.9716, longitude: 77.5946 },
    { latitude: 12.9698, longitude: 77.601 },
    { latitude: 12.9652, longitude: 77.6073 },
    { latitude: 12.9352, longitude: 77.6245 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#05070F" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER - NOW DYNAMIC */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "#00E5FF",
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 2,
              }}
            >
              LIVE NAVIGATION
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              {routeData?.label || "Route"} Active
            </Text>
          </View>

          <View
            style={{
              backgroundColor: `${routeData?.color || "#39FF14"}20`,
              borderWidth: 1,
              borderColor: routeData?.color || "#39FF14",
              borderRadius: 18,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: routeData?.color || "#39FF14",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {routeData?.score || "0.0"}
            </Text>
          </View>
        </View>

        {/* MAP - NOW DYNAMIC */}
        <View
          style={{
            height: 280,
            marginHorizontal: 20,
            borderRadius: 28,
            overflow: "hidden",
            marginBottom: 22,
            borderWidth: 1,
            borderColor: "rgba(0,229,255,0.15)",
          }}
        >
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 12.955,
              longitude: 77.605,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
            }}
          >
            <Marker coordinate={routeCoordinates[0]} title="Start" />
            <Marker
              coordinate={routeCoordinates[routeCoordinates.length - 1]}
              title="Destination"
            />
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={6}
              strokeColor={routeData?.color || "#39FF14"}
            />
          </MapView>

          {/* MAP TAGS (Visual markers for safety) */}
          <View style={{ position: "absolute", top: 18, left: 18 }}>
            {[
              { icon: "🔦", title: "Lighting", color: "#FFE600" },
              { icon: "👥", title: "Crowd", color: "#00E5FF" },
              { icon: "⚠️", title: "Risk", color: "#FF1744" },
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "rgba(5,7,15,0.85)",
                  borderRadius: 14,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: item.color,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                <Text
                  style={{
                    color: item.color,
                    marginLeft: 8,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* NEXT TURN */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "rgba(0,229,255,0.08)",
            borderWidth: 1,
            borderColor: "rgba(0,229,255,0.25)",
            borderRadius: 24,
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              backgroundColor: "rgba(0,229,255,0.15)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>📍</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ color: "#7C8CA5", marginBottom: 6 }}>
              Next turn in 200m
            </Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {instructions[step]}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setStep((prev) => (prev + 1) % instructions.length)}
          >
            <Text
              style={{ color: "#00E5FF", fontSize: 30, fontWeight: "bold" }}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* ALERT */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: `${currentAlert.color}15`,
            borderWidth: 1,
            borderColor: currentAlert.color,
            borderRadius: 22,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: `${currentAlert.color}25`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22 }}>{currentAlert.icon}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text
              style={{
                color: currentAlert.color,
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              Alert Ahead
            </Text>
            <Text style={{ color: "#D1D5DB" }}>{currentAlert.title}</Text>
          </View>
          <Text style={{ color: currentAlert.color, fontWeight: "bold" }}>
            {currentAlert.distance}
          </Text>
        </View>

        {/* ETA - NOW DYNAMIC */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#0B1730",
            borderRadius: 24,
            paddingVertical: 22,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {[
            {
              value: routeData?.time || "12 min",
              label: "ETA",
              color: routeData?.color || "#39FF14",
            },
            {
              value: routeData?.distance || "1.8 km",
              label: "Distance",
              color: "white",
            },
            {
              value: routeData?.score || "8.7",
              label: "Safety",
              color: routeData?.color || "#39FF14",
            },
          ].map((item, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Text
                style={{ color: item.color, fontSize: 22, fontWeight: "bold" }}
              >
                {item.value}
              </Text>
              <Text style={{ color: "#7C8CA5", marginTop: 4 }}>
                {item.label}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: "rgba(0,229,255,0.15)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>🔊</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
