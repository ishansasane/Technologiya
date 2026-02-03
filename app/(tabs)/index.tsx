import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function Index() {
  const [fontLoaded] = useFonts({
    mono: require("../../assets/fonts/ibm-plex-mono.regular.ttf"),
    nothing: require("../../assets/fonts/LEDDot-Matrix.ttf"),
  });
  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <View>
        <Text className="text-white text-4xl" style={{ fontFamily: "nothing" }}>
          Articales
        </Text>
      </View>
    </SafeAreaView>
  );
}
