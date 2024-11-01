import { memo } from "react";

export const withMemo: <T>(component: T) => T = memo;
