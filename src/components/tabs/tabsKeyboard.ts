import type { KeyboardEvent as ReactKeyboardEvent } from "react";

export function getEnabledTabs(list: HTMLElement): HTMLButtonElement[] {
  return Array.from(
    list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
  );
}

export function getTabToSelectOnKeyDown(
  event: ReactKeyboardEvent<HTMLElement>,
  list: HTMLElement,
): HTMLButtonElement | null {
  const tabs = getEnabledTabs(list);
  if (tabs.length === 0) return null;

  const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown": {
      event.preventDefault();
      return tabs[(safeIndex + 1) % tabs.length] ?? null;
    }
    case "ArrowLeft":
    case "ArrowUp": {
      event.preventDefault();
      return tabs[(safeIndex - 1 + tabs.length) % tabs.length] ?? null;
    }
    case "Home": {
      event.preventDefault();
      return tabs[0] ?? null;
    }
    case "End": {
      event.preventDefault();
      return tabs[tabs.length - 1] ?? null;
    }
    default:
      return null;
  }
}
