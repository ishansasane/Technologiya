import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const Favourates = () => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-black">
        <Text className="text-white text-3xl" style={{ fontFamily: "nothing" }}>
          Hello
        </Text>
      </SafeAreaView>
    </>
  );
};
export default Favourates;
