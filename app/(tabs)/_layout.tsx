import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#07111F",
          borderTopWidth: 1,
          borderTopColor: "#10233D",
          height: 75,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarActiveTintColor: "#00CFFF",
        tabBarInactiveTintColor: "#7C8CA5",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🏠</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="routes"
        options={{
          title: "Routes",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🗺️</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="navigate"
        options={{
          title: "Navigate",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>📍</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🛡️</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>📋</Text>
          ),
        }}
      />
    </Tabs>
  );
}
