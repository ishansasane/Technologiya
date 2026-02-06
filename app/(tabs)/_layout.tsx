import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchArticales, resetArticles } from "@/redux/slice/articale";
import { RootType, store } from "@/redux/store";

import { setI18nLanguage } from "@/assets/i18n";

const TabsLayout = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootType) => state.language.language);

  useEffect(() => {
    dispatch(resetArticles());
    dispatch(fetchArticales(1));
    setI18nLanguage(language);
  }, [language]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          height: 60,
          backgroundColor: "black",

          paddingTop: 5,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourates"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
