import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

const Card = () => {
  const [liked, setLiked] = useState(false);

  return (
    <View className="bg-white/20 rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-white mx-1 my-4">
      {/* Image */}
      <View className="relative">
        <Image
          style={{ height: 140, width: "100%" }}
          source={{
            uri: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh904if2wigmys4zl42sx.png",
          }}
        />

        {/* Heart Button */}
        <TouchableOpacity
          onPress={() => setLiked(!liked)}
          activeOpacity={0.8}
          className={`absolute top-2 right-2 rounded-full p-2 ${
            liked ? "bg-red-500/20" : "bg-black/50"
          }`}
        >
          <Text className="text-lg">{liked ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Title */}
        <Text
          className="text-white text-sm leading-tight mb-3"
          style={{ fontFamily: "mono" }}
          numberOfLines={2}
        >
          Should Junior Developers Still Learn JavaScript the Hard Way?
        </Text>

        {/* Profile + Date */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              className="h-8 w-8 rounded-full border border-gray-700"
              source={{
                uri: "https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F3623264%2F9153b8c6-8ac5-4b16-8507-01ca84f8d020.jpeg",
              }}
            />
            <Text
              className="text-white ml-2 text-xs"
              style={{ fontFamily: "mono" }}
            >
              John Doe
            </Text>
          </View>

          <Text
            className="text-gray-400 text-xs"
            style={{ fontFamily: "mono" }}
          >
            2026-02-01
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
