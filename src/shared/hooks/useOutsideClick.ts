"use client";

import { useEffect } from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClose: () => void,
  enabled: boolean = true,
  triggerGroup?: string,
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return;

      const target = event.target as HTMLElement;

      if (ref.current.contains(target)) return;

      const trigger = target.closest("[data-panel-trigger]");
      if (
        trigger &&
        trigger.getAttribute("data-panel-trigger") === triggerGroup
      ) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onClose, enabled, triggerGroup]);
}
