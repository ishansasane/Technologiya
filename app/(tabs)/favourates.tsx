import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/card";
import { useSelector } from "react-redux";
import { RootType } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";

const Favourates = () => {
  const saves = useSelector((state: RootType) => state.article.saved);

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <Text
        style={{ fontFamily: "nothing" }}
        className="text-white text-4xl mb-4"
      >
        Favourites
      </Text>
      {saves.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="save-outline" color="gray" size={70} />
        </View>
      ) : (
        <>
          <FlatList
            data={saves}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card {...item} />}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Favourates;
