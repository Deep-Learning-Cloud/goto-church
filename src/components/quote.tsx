import { Slot, component$ } from "@builder.io/qwik";

export const Quote = component$(({ class: c }: { class?: string }) => {
  return (
    <div
      class={[
        "relative flex flex-col gap-5 rounded border border-purple/10 bg-white px-10 py-5",
        c,
      ]}
    >
      <span class="absolute -left-5 -top-8 font-serif text-8xl font-bold text-purple">
        “
      </span>
      <p class="font-serif text-xl text-purple">
        <Slot />
      </p>
      <div class="flex gap-2.5 empty:hidden">
        <Slot name="actions" />
      </div>
    </div>
  );
});
