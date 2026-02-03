import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    mono: require("./../assets/fonts/ibm-plex-mono.regular.ttf"),
    nothing: require("./../assets/fonts/LEDDot-Matrix.ttf"),
  });
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
