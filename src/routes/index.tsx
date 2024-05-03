import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Quote } from "~/components/quote";
import { PrayArea } from "~/components/pray-area";

export default component$(() => {
  return (
    <div class="flex flex-col items-center gap-16 p-16">
      <div class="flex w-full max-w-3xl flex-col items-center gap-6 text-center font-serif font-bold text-purple">
        <h1 class="text-5xl leading-snug">
          Inspirational quotes for your community
        </h1>
        <p class="max-w-xl text-xl">
          Get inspiration and create inspiring quotes relating to Christianity
          and the church
        </p>
      </div>

      <PrayArea />

      <div class="flex max-w-4xl flex-wrap justify-stretch gap-10 [&>*]:min-w-[200px] [&>*]:flex-auto [&>*]:basis-[25%]">
        <Quote>
          Kindness is a language that the deaf can hear and the blind can see.
          Join us to spread love. Services on Sunday at 10:00 AM.
        </Quote>

        <Quote>
          Give us a visit, we’re open between ‘just dropped the kids off at
          school’ and ‘time to start dinner’. God doesn’t mind the timeline!
        </Quote>

        <Quote>
          WiFi inside may not be as strong as in the coffee shop, but we promise
          the connection is better. Youth Group, Tuesdays at 7 PM!
        </Quote>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
