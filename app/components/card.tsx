import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootType } from "@/redux/store";
import { toggleFavourite, DataType } from "@/redux/slice/articale";
import { WebView } from "react-native-webview";

const Card = (props: DataType) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const isLiked = useSelector((state: RootType) =>
    state.article.saved.some((item) => item.id === props.id),
  );

  const handleLikePress = () => {
    dispatch(toggleFavourite(props));
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        className="bg-white/20 rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-white mx-1 my-4"
      >
        <View className="relative">
          <Image
            style={{ height: 140, width: "100%" }}
            source={{ uri: props.cover_image }}
          />

          <TouchableOpacity
            onPress={handleLikePress}
            activeOpacity={0.8}
            className={`absolute top-2 right-2 rounded-full p-2 ${
              isLiked ? "bg-red-500/20" : "bg-black/50"
            }`}
          >
            <Text className="text-lg">{isLiked ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        <View className="p-3">
          <Text
            className="text-white text-sm leading-tight mb-3"
            style={{ fontFamily: "mono" }}
            numberOfLines={2}
          >
            {props.title}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                className="h-8 w-8 rounded-full border border-gray-700"
                source={{ uri: props.profile_image }}
              />
              <Text
                className="text-white ml-2 text-xs"
                style={{ fontFamily: "mono" }}
              >
                {props.user}
              </Text>
            </View>

            <Text
              className="text-gray-400 text-xs"
              style={{ fontFamily: "mono" }}
            >
              {new Date(props.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#1a1a1a",
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ padding: 8 }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginLeft: 12,
                flex: 1,
                fontFamily: "mono",
              }}
              numberOfLines={1}
            >
              {props.title}
            </Text>
          </View>

          <WebView source={{ uri: props.url }} style={{ flex: 1 }} />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Card;
