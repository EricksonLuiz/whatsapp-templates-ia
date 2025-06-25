
import React from 'react';

interface DualListBoxProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: { id: string; name: string }[];
  rightItems: { id: string; name: string }[];
  onAssign: (id: string) => void;
  onUnassign: (id: string) => void;
}

const DualListBox: React.FC<DualListBoxProps> = ({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  onAssign,
  onUnassign,
}) => {
  const [selectedLeft, setSelectedLeft] = React.useState<string | null>(null);
  const [selectedRight, setSelectedRight] = React.useState<string | null>(null);

  return (
    <div className="flex w-full flex-col md:flex-row gap-6">
      {/* Left box (disponíveis) */}
      <div className="flex-1">
        <div className="mb-2 font-semibold text-white">{leftTitle}</div>
        <div className="bg-white/10 rounded-xl p-4 min-h-[200px]">
          {leftItems.length === 0 && (
            <div className="text-gray-400 text-sm py-10 text-center">Nenhuma categoria disponível</div>
          )}
          <ul className="space-y-2">
            {leftItems.map(item => (
              <li
                key={item.id}
                className={`p-2 rounded cursor-pointer ${selectedLeft === item.id ? "bg-blue-500/60 text-white" : "hover:bg-white/20 text-white"}`}
                onClick={() => setSelectedLeft(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Botões de ação */}
      <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4">
        <button
          aria-label="Atribuir"
          onClick={() => selectedLeft && onAssign(selectedLeft)}
          disabled={!selectedLeft}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 disabled:opacity-50"
        >→</button>
        <button
          aria-label="Desatribuir"
          onClick={() => selectedRight && onUnassign(selectedRight)}
          disabled={!selectedRight}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 disabled:opacity-50"
        >←</button>
      </div>
      {/* Right box (atribuídas) */}
      <div className="flex-1">
        <div className="mb-2 font-semibold text-white">{rightTitle}</div>
        <div className="bg-white/10 rounded-xl p-4 min-h-[200px]">
          {rightItems.length === 0 && (
            <div className="text-gray-400 text-sm py-10 text-center">Nenhuma categoria atribuída</div>
          )}
          <ul className="space-y-2">
            {rightItems.map(item => (
              <li
                key={item.id}
                className={`p-2 rounded cursor-pointer ${selectedRight === item.id ? "bg-green-500/60 text-white" : "hover:bg-white/20 text-white"}`}
                onClick={() => setSelectedRight(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DualListBox;
