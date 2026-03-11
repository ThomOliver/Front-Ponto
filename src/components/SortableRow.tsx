"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface SortableRowProps {
  id: string;
  children: React.ReactNode;
}

const SortableRow: React.FC<SortableRowProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </tr>
  );
};

interface SortableTableProps<T> {
  items: T[];
  getId: (item: T) => string;
  onReorder: (id: string, newPosition: number) => void;
  renderRow: (item: T, isEditing: boolean) => React.ReactNode;
  editingId: string | null;
}

export function SortableTable<T>({
  items,
  getId,
  onReorder,
  renderRow,
  editingId,
}: SortableTableProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => getId(i) === active.id);
    const newIndex = items.findIndex((i) => getId(i) === over.id);

    if (oldIndex !== newIndex) {
      const reordered = arrayMove(items, oldIndex, newIndex);
      const moved = reordered[newIndex];
      onReorder(getId(moved), newIndex + 1); 
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => getId(i))}
        strategy={verticalListSortingStrategy}
      >
        <table className="min-w-full border border-neutral rounded-lg shadow-sm bg-bg text-text">
          <tbody>
            {items.map((item) => (
              <SortableRow key={getId(item)} id={getId(item)}>
                {renderRow(item, editingId === getId(item))}
              </SortableRow>
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
}
