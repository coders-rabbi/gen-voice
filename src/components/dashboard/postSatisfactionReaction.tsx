import { TReactionType } from "@/types/reaction.type";

const reactionConfig: {
  type: TReactionType;
  emoji: string;
  label: string;
  color: string;
}[] = [
  { type: "like", emoji: "👍", label: "Like", color: "#2078f4" },
  { type: "love", emoji: "❤️", label: "Love", color: "#f33e58" },
  { type: "wow", emoji: "😲", label: "Wow", color: "#f7b125" },
  { type: "sad", emoji: "😢", label: "Sad", color: "#8a8a8a" },
  { type: "angry", emoji: "😡", label: "Angry", color: "#e9710f" },
];

interface PostSatisfactionReactionProps {
  type: TReactionType;
  count: number;
}

const PostSatisfactionReaction = ({ type, count }: PostSatisfactionReactionProps) => {
  const config = reactionConfig.find((item) => item.type === type);

  if (!config) return null;

  return (
    <div className="bg-[#F5F5F5] py-2 px-2 rounded-[12px]">
      <p className="text-xs text-[#3E3232] mb-2 text-center">{config.label}</p>
      <span className="text-3xl block text-center" style={{ color: config.color }}>
        {config.emoji}
      </span>
      <p className="text-xs text-[#3E3232] mt-2 text-center">{count} Post</p>
    </div>
  );
};

export default PostSatisfactionReaction;