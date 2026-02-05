import { selectTage } from "@/redux/slice/articale";
import { RootType } from "@/redux/store";
import { Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

type TagBoxProps = {
  name: string;
};

const TagBox = ({ name }: TagBoxProps) => {
  const dispatch = useDispatch();

  const selectedTag = useSelector(
    (state: RootType) => state.article.selectedTag,
  );

  const isSelected = selectedTag?.toUpperCase() === name.toUpperCase();

  return (
    <Chip
      mode="outlined"
      onPress={() => dispatch(selectTage(name))}
      style={{
        height: 36,
        borderRadius: 18,
        marginRight: 8,
        borderWidth: 1.5,
        borderColor: isSelected ? "#ffffff" : "#374151",
        backgroundColor: "#111827",
      }}
      textStyle={{
        color: isSelected ? "#ffffff" : "#e5e7eb",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "mono",
      }}
    >
      {name.toUpperCase()}
    </Chip>
  );
};

export default TagBox;
