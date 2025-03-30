import React from "react";

const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"];

function AvatarCircles({ members }) {
  const maxVisible = 5;
  const visibleMembers = members.slice(0, maxVisible);
  const extraCount = members.length - maxVisible;

  return (
    <div className="flex gap-2 mt-4 mb-2">
      {visibleMembers.map((name, index) => {
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
        const color = colors[index % colors.length];

        return (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${color}`}
          >
            {initials}
          </div>
        );
      })}

      {extraCount > 0 && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-400 text-white text-xs font-bold">
          +{extraCount}
        </div>
      )}
    </div>
  );
}

export default AvatarCircles;
