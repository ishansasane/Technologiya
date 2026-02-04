import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/card";
import { RootType } from "@/redux/store";

export default function Index() {
  const data = useSelector((state: RootType) => state.article.data);
  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <Text style={{ fontFamily: "nothing" }} className="text-white text-4xl">
        Articales
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card {...item} />}
      />
    </SafeAreaView>
  );
}
