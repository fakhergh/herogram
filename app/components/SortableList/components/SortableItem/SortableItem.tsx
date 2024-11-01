import type {
    DraggableSyntheticListeners,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconDragHandle from '@mui/icons-material/DragHandle';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import type { CSSProperties, PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo } from 'react';

interface SortableItemProps {
    id: UniqueIdentifier;
}

interface DragHandleProps {
    disabled?: boolean;
}

interface Context {
    attributes: Record<string, any>;
    listeners: DraggableSyntheticListeners;
    ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
    attributes: {},
    listeners: undefined,
    ref() {},
});

export function SortableItem({
    children,
    id,
}: PropsWithChildren<SortableItemProps>) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id });
    const context = useMemo(
        () => ({
            attributes,
            listeners,
            ref: setActivatorNodeRef,
        }),
        [attributes, listeners, setActivatorNodeRef],
    );
    const style: CSSProperties = useMemo(
        () => ({
            opacity: isDragging ? 0.4 : undefined,
            transform: CSS.Translate.toString(transform),
            transition,
            paddingLeft: 0,
            paddingRight: 0,
        }),
        [isDragging, transform, transition],
    );

    return (
        <SortableItemContext.Provider value={context}>
            <ListItem ref={setNodeRef} style={style}>
                {children}
            </ListItem>
        </SortableItemContext.Provider>
    );
}

export function DragHandle({ disabled }: DragHandleProps) {
    const { attributes, listeners, ref } = useContext(SortableItemContext);

    return (
        <IconButton
            {...attributes}
            {...listeners}
            ref={ref}
            disableRipple
            disabled={disabled}
        >
            <IconDragHandle />
        </IconButton>
    );
}
