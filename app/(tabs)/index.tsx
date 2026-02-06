import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/card";
import { RootType } from "@/redux/store";
import { Searchbar, Chip } from "react-native-paper";
import { useState } from "react";
import {
  clearSearch,
  fetchArticales,
  searchArticlesByTag,
} from "@/redux/slice/articale";
import TagBox from "../components/tagBox";
import { useMemo } from "react";

export default function Index() {
  const { data, isLoading, searchResults, selectedTag, page, hasMore } =
    useSelector((state: RootType) => state.article);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  let listData = query.trim().length > 0 ? searchResults : data;
  if (selectedTag !== "All") {
    listData = listData.filter((item) =>
      item.tag_list.some(
        (tag) => tag.toUpperCase() === selectedTag.toUpperCase(),
      ),
    );
  }

  const loadMore = () => {
    if (!isLoading && hasMore && query.trim() === "") {
      dispatch(fetchArticales(page));
    }
  };

  const uniqueTags = useMemo(() => {
    const set = new Set<string>();

    listData.forEach((item) => {
      item.tag_list.forEach((tag) => {
        set.add(tag);
      });
    });

    return ["All", ...Array.from(set)];
  }, [data, searchResults]);

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
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          isLoading ? (
            <Text
              className="text-white text-center py-4"
              style={{ fontFamily: "mono" }}
            >
              Loading more...
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
