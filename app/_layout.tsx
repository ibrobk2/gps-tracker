import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "GPS Live Tracker: By Abubakar A. Y",
        }}
      />
    </Stack>
  );
}
