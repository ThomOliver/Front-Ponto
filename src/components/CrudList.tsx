"use client";
import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@/components/ui/Button";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { Toggle } from "./ui/Toggle";

interface CrudListProps<T> {
  items: T[];
  editingId: string | null;
  onEditClick: (item: T) => void;
  onDelete: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  renderView: (item: T) => React.ReactNode;
  renderEdit: (item: T) => React.ReactNode;
  getId: (item: T) => string;
  getImageUrl?: (item: T) => string | undefined;
  renderToggles?: (item: T) => { label: string; field: keyof T }[];
  onToggle?: (id: string, field: keyof T, value: boolean) => void;
  onReorder?: (newItems: T[]) => void;
}

function SortableRow({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "all 150ms ease",
    background: isDragging ? "rgba(0,0,0,0.05)" : undefined,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        if (index === 0) {
          const td = child as React.ReactElement<React.HTMLAttributes<HTMLTableCellElement>>;
          return React.cloneElement(td, {
            ...attributes,
            ...listeners,
            style: { cursor: "grab", ...(td.props.style || {}) },
          });
        }

        return child;
      })}
    </tr>
  );
}

export function CrudTable<T>({
  items,
  editingId,
  onEditClick,
  onDelete,
  renderView,
  renderEdit,
  getId,
  getImageUrl,
  onSave,
  onCancel,
  renderToggles,
  onToggle,
  onReorder,
}: CrudListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => getId(i) === active.id);
    const newIndex = items.findIndex((i) => getId(i) === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    onReorder?.(newItems);
  }

  return (
    <div className="overflow-x-auto">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(getId)} strategy={verticalListSortingStrategy}>
          <table className="min-w-full border border-neutral rounded-lg shadow-sm bg-bg text-text">
            <thead>
              <tr className="bg-neutral/50">
                <th className="px-4 py-2 border-b border-neutral w-6 text-center">☰</th>
                {getImageUrl && <th className="px-4 py-2 border-b border-neutral">Imagem</th>}
                <th className="px-4 py-2 border-b border-neutral">Dados</th>
                {renderToggles && (
                  <th className="px-4 py-2 border-b border-neutral text-center">Funções</th>
                )}
                <th className="px-4 py-2 border-b border-neutral text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const id = getId(item);
                const imageUrl = getImageUrl?.(item);

                return (
                  <SortableRow key={id} id={id}>
                    <td className="px-4 py-2 border-b border-neutral text-center">☰</td>

                    {editingId === id ? (
                      <td
                        colSpan={getImageUrl ? (renderToggles ? 4 : 3) : renderToggles ? 3 : 2}
                        className="px-4 py-4 border-b border-neutral"
                      >
                        <div className="flex flex-col gap-4">
                          {renderEdit(item)}
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => onSave(id)}
                              className="bg-success text-white  hover:brightness-110 transition"
                            >
                              Salvar
                            </Button>
                            <Button
                              onClick={onCancel}
                              className="bg-error text-text hover:brightness-110 transition"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        {getImageUrl && (
                          <td className="px-4 py-2 border-b border-neutral">
                            {imageUrl ? (
                              <ImageWithSkeleton src={imageUrl} />
                            ) : (
                              <span className="text-text/60 italic">Sem imagem</span>
                            )}
                          </td>
                        )}

                        <td className="px-4 py-2 border-b border-neutral">{renderView(item)}</td>

                        {renderToggles && (
                          <td className="px-4 py-2 border-b border-neutral text-center">
                            <div className="flex flex-col gap-2 items-center">
                              {renderToggles(item).map(({ label, field }) => {
                                const value = (item[field] as boolean) ?? false;
                                return (
                                  <div key={String(field)} className="flex items-center gap-2 text-sm">
                                    <Toggle
                                      label={label}
                                      checked={value}
                                      onChange={(checked) => onToggle?.(id, field, checked)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        )}

                        <td className="px-4 py-2 border-b border-neutral text-center">
                          <div className="flex flex-col justify-center gap-2">
                            <Button
                              onClick={() => onEditClick(item)}
                              className="bg-warning text-white px-3 py-1 rounded-md hover:brightness-110 transition"
                            >
                              Editar
                            </Button>
                            <Button
                              onClick={() => onDelete(id)}
                              className="bg-error text-white px-3 py-1 rounded-md hover:brightness-110 transition"
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </>
                    )}
                  </SortableRow>
                );
              })}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
