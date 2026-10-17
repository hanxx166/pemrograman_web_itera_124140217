/* ============================================================
   js/components/toggle.js
   Komponen Toggle gaya shadcn/Radix, diadaptasi ke vanilla JS.
   Meniru API: variant, size, pressed, icons, onPressedChange,
   disabled. State disimpan pada atribut data-state="on" | "off".
   ============================================================ */

const VARIANTS = ["default", "outline"];
const SIZES = ["sm", "default", "lg"];

export function createToggle({
  variant = "default",
  size = "default",
  pressed = false,
  icons = null, // { on: "<svg>...</svg>", off: "<svg>...</svg>" }
  onPressedChange,
  className = "",
  ...attrs
} = {}) {
  const el = document.createElement("button");
  el.type = "button";

  el.className = [
    "toggle",
    `toggle-${VARIANTS.includes(variant) ? variant : "default"}`,
    `toggle-${SIZES.includes(size) ? size : "default"}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  Object.entries(attrs).forEach(([key, value]) => {
    if (value != null) el.setAttribute(key, value);
  });

  // Kontainer ikon bawaan komponen (bukan emoji)
  const iconEl = document.createElement("span");
  iconEl.className = "toggle-icon";
  el.appendChild(iconEl);

  // Sinkronkan tampilan (data-state + aria-pressed + ikon) dengan nilai pressed
  const setPressed = (next) => {
    el.dataset.state = next ? "on" : "off";
    el.setAttribute("aria-pressed", String(next));
    if (icons) iconEl.innerHTML = next ? icons.on : icons.off;
  };
  setPressed(pressed);

  el.addEventListener("click", () => {
    if (el.disabled) return;
    const next = el.dataset.state !== "on";
    setPressed(next);
    onPressedChange?.(next);
  });

  // Ekspos kontrol manual agar state bisa disinkronkan dari luar
  el.setPressed = setPressed;
  return el;
}
