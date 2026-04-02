import React from "react";

function Cell({ cell, onClick, onRightClick }) {
  let className = "cell";

  if (cell.revealed) className += " revealed";
  if (cell.flagged) className += " flag";
  if (cell.virus && cell.revealed) className += " virus";

  return (
    <div
      className={className}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {cell.revealed && !cell.virus && cell.value > 0 && cell.value}
      {cell.flagged && "🚩"}
      {cell.virus && cell.revealed && "💀"}
    </div>
  );
}

export default Cell;