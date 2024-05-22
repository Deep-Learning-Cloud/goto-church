import { component$, Slot } from "@builder.io/qwik";
import { Header } from "./header";

export const PageLayout = component$(() => {
  return (
    <div class="flex flex-col items-center gap-10 p-6 md:gap-16 md:p-16">
      <Header />

      <div class="flex w-full max-w-3xl flex-col items-center gap-6 text-center font-serif font-bold text-purple">
        <Slot name="head" />
      </div>

      <Slot />
    </div>
  );
});
