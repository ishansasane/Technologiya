import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    mono: require("./../assets/fonts/ibm-plex-mono.regular.ttf"),
    nothing: require("./../assets/fonts/LEDDot-Matrix.ttf"),
  });
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
