import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootType, store } from "@/redux/store";
import { useEffect } from "react";
import { setI18nLanguage } from "@/assets/i18n";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    mono: require("./../assets/fonts/ibm-plex-mono.regular.ttf"),
    nothing: require("./../assets/fonts/LEDDot-Matrix.ttf"),
  });

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
