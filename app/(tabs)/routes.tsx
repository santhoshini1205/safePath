import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function RoutesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState("safest");

  const routes = [
    {
      id: "fastest",
      label: "Fastest Route",
      time: "8 min",
      distance: "1.2 km",
      score: "3.4",
      color: "#FF1744",
      tag: "UNSAFE",
      via: "Via Brigade Rd & Richmond Rd",
      risks: [
        "Poorly lit alley near Brigade Rd",
        "Low foot traffic",
        "Crime hotspot nearby",
      ],
      segments: [
        { width: "35%", color: "#FF1744" },
        { width: "45%", color: "#FF1744" },
        { width: "20%", color: "#FFE600" },
      ],
      coordinates: [
        { latitude: 12.9716, longitude: 77.5946 },
        { latitude: 12.967, longitude: 77.607 },
        { latitude: 12.948, longitude: 77.618 },
        { latitude: 12.9352, longitude: 77.6245 },
      ],
    },
    {
      id: "safest",
      label: "Safest Route",
      time: "12 min",
      distance: "1.8 km",
      score: "8.7",
      color: "#39FF14",
      tag: "RECOMMENDED",
      via: "Via MG Road & Indiranagar",
      risks: ["Well lit streets", "High foot traffic", "Camera coverage"],
      segments: [
        { width: "50%", color: "#39FF14" },
        { width: "30%", color: "#FFE600" },
        { width: "20%", color: "#39FF14" },
      ],
      coordinates: [
        { latitude: 12.9716, longitude: 77.5946 },
        { latitude: 12.969, longitude: 77.599 },
        { latitude: 12.955, longitude: 77.612 },
        { latitude: 12.9352, longitude: 77.6245 },
      ],
    },
  ];

  const handleStartNavigation = () => {
    const selectedRoute = routes.find((r) => r.id === selected);
    router.push({
      pathname: "/navigate",
      params: { routeData: JSON.stringify(selectedRoute) },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <Text style={styles.subHeader}>ROUTE ANALYSIS</Text>
        <Text style={styles.mainHeader}>Choose Route</Text>
        <Text style={styles.locationText}>📍 MG Road → Koramangala</Text>

        {/* MAP SECTION */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 12.955,
              longitude: 77.605,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            customMapStyle={darkMapStyle}
          >
            {/* We render all polylines but make the selected one thicker */}
            {routes.map((route) => (
              <Polyline
                key={route.id}
                coordinates={route.coordinates}
                strokeWidth={selected === route.id ? 7 : 3}
                strokeColor={
                  selected === route.id ? route.color : "rgba(255,255,255,0.2)"
                }
                zIndex={selected === route.id ? 10 : 1}
              />
            ))}
            <Marker coordinate={routes[0].coordinates[0]} title="Start" />
            <Marker coordinate={routes[0].coordinates[3]} title="End" />
          </MapView>
        </View>

        {/* DYNAMIC CARDS */}
        {routes.map((route) => {
          const isActive = selected === route.id;
          return (
            <TouchableOpacity
              key={route.id}
              activeOpacity={0.9}
              onPress={() => setSelected(route.id)}
              style={[
                styles.card,
                isActive && {
                  borderColor: `${route.color}80`,
                  backgroundColor: `${route.color}10`,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{route.label}</Text>
                    <View
                      style={[
                        styles.tag,
                        {
                          borderColor: `${route.color}60`,
                          backgroundColor: `${route.color}20`,
                        },
                      ]}
                    >
                      <Text style={[styles.tagText, { color: route.color }]}>
                        {route.tag}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.viaText}>{route.via}</Text>
                </View>

                {/* SAFETY SCORE CIRCLE */}
                <View
                  style={[styles.scoreCircle, { borderColor: route.color }]}
                >
                  <Text style={[styles.scoreText, { color: route.color }]}>
                    {route.score}
                  </Text>
                  <Text style={styles.scoreSubText}>SAFETY</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoBadge}>
                  <Text style={styles.whiteText}>⏱ {route.time}</Text>
                </View>
                <View style={styles.infoBadge}>
                  <Text style={styles.whiteText}>📍 {route.distance}</Text>
                </View>
              </View>

              {/* PROGRESS BAR SEGMENTS */}
              <View style={styles.segmentBar}>
                {route.segments.map((seg, i) => (
                  <View
                    key={i}
                    style={{
                      width: seg.width,
                      backgroundColor: seg.color,
                      height: "100%",
                    }}
                  />
                ))}
              </View>

              {/* RISK/FEATURES LIST */}
              {route.risks.map((risk, i) => (
                <View key={i} style={styles.riskRow}>
                  <Text style={{ color: route.color, marginRight: 8 }}>
                    {route.id === "safest" ? "✓" : "⚠"}
                  </Text>
                  <Text style={styles.riskText}>{risk}</Text>
                </View>
              ))}
            </TouchableOpacity>
          );
        })}

        {/* FINAL ACTION BUTTON */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleStartNavigation}
        >
          <Text style={styles.navButtonText}>Start Navigation →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05070F" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 120 },
  subHeader: {
    color: "rgba(0,229,255,0.7)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  mainHeader: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
  locationText: {
    color: "rgba(255,255,255,0.4)",
    marginTop: 8,
    marginBottom: 24,
  },
  mapContainer: {
    height: 240,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0,229,255,0.15)",
  },
  map: { width: "100%", height: "100%" },
  card: {
    backgroundColor: "#0D1426",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  titleRow: { flexDirection: "row", alignItems: "center" },
  cardTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  tag: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 30,
    marginLeft: 10,
  },
  tagText: { fontSize: 10, fontWeight: "bold" },
  viaText: { color: "rgba(255,255,255,0.4)", marginTop: 8 },
  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: { fontSize: 22, fontWeight: "bold" },
  scoreSubText: { color: "white", fontSize: 8, marginTop: 2 },
  infoRow: { flexDirection: "row", marginBottom: 16 },
  infoBadge: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 12,
  },
  whiteText: { color: "white" },
  segmentBar: {
    flexDirection: "row",
    height: 8,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
  },
  riskRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  riskText: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  navButton: {
    backgroundColor: "#00E5FF",
    borderRadius: 24,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },
  navButtonText: { color: "#05070F", fontSize: 18, fontWeight: "bold" },
});

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#05070F" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#07111F" }],
  },
  { elementType: "labels.text.fill", stylers: [{ color: "#7C8CA5" }] },
];
