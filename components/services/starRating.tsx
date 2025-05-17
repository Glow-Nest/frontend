import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => onRatingChange(value)}
          className="text-yellow-400 hover:scale-105 transition"
        >
          <Star fill={value <= rating ? "currentColor" : "none"} stroke="currentColor" />
        </button>
      ))}
    </div>
  );
}
