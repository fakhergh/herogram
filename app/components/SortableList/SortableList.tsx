import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragCancelEvent } from "@dnd-kit/core/dist/types";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import List from "@mui/material/List";
import { ReactNode, useCallback } from "react";
import { Fragment, useMemo, useState } from "react";

import {
  DragHandle,
  SortableItem,
} from "./components/SortableItem/SortableItem";
import { SortableOverlay } from "./components/SortableOverlay/SortableOverlay";

export interface SortableListBaseItem {
  id: UniqueIdentifier;
}

export interface SortableListProps<T extends SortableListBaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
}

export function SortableList<T extends SortableListBaseItem>({
  items,
  onChange,
  renderItem,
}: SortableListProps<T>) {
  const [active, setActive] = useState<Active | null>(null);

  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = useCallback((event: DragCancelEvent) => {
    setActive(event.active);
  }, []);

  const onDragEnd = useCallback(
    (event: DragCancelEvent) => {
      if (event.over && event.active.id !== event.over?.id) {
        const activeIndex = items.findIndex(({ id }) => id === event.active.id);
        const overIndex = items.findIndex(({ id }) => id === event.over?.id);

        onChange(arrayMove(items, activeIndex, overIndex));
      }
      setActive(null);
    },
    [items, onChange],
  );

  const onDragCancel = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <SortableContext items={items}>
        <List
          role="application"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {items.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))}
        </List>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
