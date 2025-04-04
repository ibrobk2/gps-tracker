import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("RootLayout component rendered"); // Moved inside the function
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "GPS Live Tracker: By Abubakar A. Y.",
        }}
      />
    </Stack>
  );
}
