import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/card";
import { RootType } from "@/redux/store";
import { Searchbar, Chip, Menu, IconButton } from "react-native-paper";
import { useState } from "react";
import {
  clearSearch,
  fetchArticales,
  searchArticlesByTag,
} from "@/redux/slice/articale";
import TagBox from "../components/tagBox";
import { useMemo } from "react";
import i18n from "@/assets/i18n";
import { setLanguage } from "@/redux/slice/settings";

export default function Index() {
  const { data, isLoading, searchResults, selectedTag, page, hasMore } =
    useSelector((state: RootType) => state.article);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const changeLanguage = (lang: string) => {
    closeMenu();
    dispatch(setLanguage(lang));
  };
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
      <View className="flex flex-row items-center justify-between bg-black">
        <Text style={{ fontFamily: "nothing" }} className="text-white text-4xl">
          {i18n.t("articles")}
        </Text>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="translate"
              iconColor="white"
              size={28}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item onPress={() => changeLanguage("en")} title="English" />
          <Menu.Item onPress={() => changeLanguage("hi")} title="हिन्दी" />
          <Menu.Item onPress={() => changeLanguage("ar")} title="العربية" />
          <Menu.Item onPress={() => changeLanguage("ch")} title="中文" />
          <Menu.Item onPress={() => changeLanguage("ja")} title="日本語" />
          <Menu.Item onPress={() => changeLanguage("ko")} title="한국어" />
        </Menu>
      </View>

      <Searchbar
        mode="bar"
        loading={isLoading}
        style={{ height: 50 }}
        inputStyle={{ fontFamily: "nothing" }}
        placeholder={i18n.t("search")}
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
        style={{ height: 47, paddingTop: 0 }}
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
              {i18n.t("loading")}
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
