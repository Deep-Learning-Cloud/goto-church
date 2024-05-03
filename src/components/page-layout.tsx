import { component$, Slot } from "@builder.io/qwik";

export const PageLayout = component$(() => {
  return (
    <div class="flex flex-col items-center gap-16 p-16">
      <div class="flex w-full max-w-3xl flex-col items-center gap-6 text-center font-serif font-bold text-purple">
        <Slot name="head" />
      </div>

      <Slot />
    </div>
  );
});
