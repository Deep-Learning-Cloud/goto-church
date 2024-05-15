import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm";
type ButtonColor = "primary" | "green";

export const Button = component$(
  ({
    variant = "primary",
    size = "md",
    color = "primary",
    ...props
  }: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
  } & QwikIntrinsicElements["button"]) => {
    return (
      <button
        class={[
          "flex flex-nowrap items-center gap-2.5 rounded text-center font-sans font-bold",
          {
            "bg-purple text-white":
              variant === "primary" && color === "primary",
            "bg-green text-white": variant === "primary" && color === "green",
            "border-2": variant === "secondary",
            "border-purple text-purple":
              variant === "secondary" && color === "primary",
            "border-green text-green":
              variant === "secondary" && color === "green",
            "px-7 py-4 text-xl": size === "md",
            "px-4 py-2.5 text-base": size === "sm",
          },
        ]}
        {...props}
      >
        <Slot />
      </button>
    );
  },
);
