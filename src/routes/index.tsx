import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Quote } from "~/components/quote";
import { PrayArea } from "~/components/pray-area";
import { getGenerateRequests } from "~/utils/store";
import { exists } from "~/utils/exists";
import { PageLayout } from "~/components/page-layout";

export default component$(() => {
  const previousQuotes = useSignal<string[]>([]);

  useVisibleTask$(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypalobjects.com/donate/sdk/donate-sdk.js";
    script.charset = "UTF-8";
    script.addEventListener("load", () => {
      (window as any).PayPal.Donation.Button({
        env: "production",
        hosted_button_id: "577DU7SKN8S7E",
        image: {
          src: "https://pics.paypal.com/00/s/MmJlMjE3YjItMjkwYS00MTBmLWIyNzItYmVhMmRjOTYxNjkw/file.PNG",
          alt: "Donate with PayPal button",
          title: "PayPal - The safer, easier way to pay online!",
        },
      }).render("#donate-button");
    });
    document.head.appendChild(script);
  });

  useVisibleTask$(async () => {
    const requests = await getGenerateRequests();
    previousQuotes.value = requests
      .flatMap((r) => r.results)
      .filter(exists)
      .toReversed();
  });

  return (
    <PageLayout>
      <div
        class="flex w-full max-w-3xl flex-col items-center gap-6 text-center font-serif font-bold text-purple"
        q:slot="head"
      >
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
        {previousQuotes.value.map((quote, index) => (
          <Quote key={index}>{quote}</Quote>
        ))}
      </div>

      <div class="flex flex-wrap justify-center gap-9 self-center">
        <div id="donate-button-container">
          <div id="donate-button" class="h-[54px] w-[151px]" />
        </div>
      </div>
    </PageLayout>
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
