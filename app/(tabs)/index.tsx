import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/card";
import { RootType } from "@/redux/store";
import { Searchbar, FAB, Menu, IconButton } from "react-native-paper";
import { useState, useRef, useEffect } from "react";
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
  const menuAnchorRef = useRef<View>(null);
  const flatListRef = useRef<FlatList>(null);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
    closeMenu();
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

        <View ref={menuAnchorRef} className="relative">
          <IconButton
            icon="translate"
            iconColor="white"
            size={28}
            onPress={() => {
              setMenuVisible(!menuVisible);
            }}
          />
        </View>

        {menuVisible && (
          <View className="absolute right-0 top-12 z-50 bg-gray-900 rounded-lg shadow-lg w-48">
            <Menu.Item
              onPress={() => changeLanguage("en")}
              title="English"
              className="py-3"
            />
            <Menu.Item
              onPress={() => changeLanguage("hi")}
              title="हिन्दी"
              className="py-3"
            />
            <Menu.Item
              onPress={() => changeLanguage("ar")}
              title="العربية"
              className="py-3"
            />
            <Menu.Item
              onPress={() => changeLanguage("ch")}
              title="中文"
              className="py-3"
            />
            <Menu.Item
              onPress={() => changeLanguage("ja")}
              title="日本語"
              className="py-3"
            />
            <Menu.Item
              onPress={() => changeLanguage("ko")}
              title="한국어"
              className="py-3"
            />
          </View>
        )}
      </View>

      {menuVisible && (
        <View className="absolute inset-0 z-40" onTouchStart={closeMenu} />
      )}

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
      />

      <FlatList
        data={uniqueTags}
        style={{ height: 47, paddingTop: 0 }}
        horizontal={true}
        renderItem={({ item }) => <TagBox name={item} />}
      />

      <FlatList
        data={listData}
        ref={flatListRef}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card {...item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        showsVerticalScrollIndicator={false}
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
      <FAB
        icon="arrow-up"
        onPress={scrollToTop}
        style={{
          position: "absolute",
          margin: 10,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          borderWidth: 1.5,
          borderColor: "white",
          elevation: 8,
          shadowColor: "",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          borderStyle: "dotted",
          borderRadius: "100%",
        }}
      />
    </SafeAreaView>
  );
}
