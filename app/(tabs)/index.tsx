import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/card";
import { RootType } from "@/redux/store";
import { Searchbar, Chip } from "react-native-paper";
import { useState } from "react";
import { clearSearch, searchArticlesByTag } from "@/redux/slice/articale";
import TagBox from "../components/tagBox";

export default function Index() {
  const { data, isLoading, searchResults, selectedTag } = useSelector(
    (state: RootType) => state.article,
  );
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  let listData = query.trim().length > 0 ? searchResults : data;
  if (selectedTag && selectedTag !== "All") {
    listData = listData.filter((item) =>
      item.tag_list
        .map((tag) => tag.toUpperCase())
        .includes(selectedTag.toUpperCase()),
    );
  }
  let uniqueTags = Array.from(
    new Set(listData.flatMap((item) => item.tag_list)),
  );
  uniqueTags = ["All", ...uniqueTags];

  return (
    <SafeAreaView className="flex-1 bg-black px-4 gap-2 pt-4">
      <Text style={{ fontFamily: "nothing" }} className="text-white text-4xl">
        Articales
      </Text>
      <Searchbar
        mode="bar"
        loading={isLoading}
        style={{ height: 50 }}
        inputStyle={{ fontFamily: "nothing" }}
        placeholder="Search"
        value={query}
        onChangeText={(e) => {
          setQuery(e);
          if (!e.trim()) {
            dispatch(clearSearch());
          }
        }}
        onSubmitEditing={() => {
          dispatch(searchArticlesByTag(query.trim()));
        }}
      ></Searchbar>
      <FlatList
        data={uniqueTags}
        style={{ height: 45, paddingTop: 0 }}
        horizontal={true}
        renderItem={({ item }) => <TagBox name={item} />}
      />

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card {...item} />}
      />
    </SafeAreaView>
  );
}
