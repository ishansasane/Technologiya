import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/card";
import { Button } from "@react-navigation/elements";
import { fetchArticales } from "@/redux/slice/articale";

const Favourates = () => {
  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <Text style={{ fontFamily: "nothing" }} className="text-white text-4xl">
        Favourites
      </Text>
      <ScrollView>
        <Card />
        <Button
          onPress={async () => {
            fetchArticales();
          }}
        >
          Click
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Favourates;
