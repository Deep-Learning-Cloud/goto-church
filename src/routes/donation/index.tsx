import { Button } from "../../components/button";
import { PageLayout } from "~/components/page-layout";
import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
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
  return (
    <PageLayout>
      <h1 q:slot="head" class="text-5xl leading-snug">
        Support the Children of Good in Sweden
      </h1>

      <div class="flex max-w-4xl flex-col flex-wrap justify-stretch gap-10 text-center text-purple [&>*]:min-w-[200px] [&>*]:flex-auto [&>*]:basis-[25%] [&>*]:font-serif">
        <p>
          <strong>Dear Friends and Believers,</strong>
        </p>
        <p>
          In the heart of Sweden, there are two remarkable individuals who
          embody the spirit of kindness and resilience. Though legally
          considered adults, they are affectionately known as the "Children of
          Good" within our community. These inspiring individuals face financial
          hardships that limit their potential, and they need our direct
          support.
        </p>
        <p>
          Our community is committed to aiding these two individuals in their
          time of need. Your generous donations will specifically go towards
          their educational and living expenses, providing them with the
          essential resources to thrive.
        </p>
        <div class="flex flex-col gap-1 text-start">
          <p>
            <strong>Your generosity can transform lives:</strong>
          </p>
          <ul class="list-inside list-disc text-start">
            <li>
              <strong>$50</strong> helps cover daily necessities such as food
              and transportation for a week.
            </li>
            <li>
              <strong>$120</strong> assists with purchasing school books and
              learning materials.
            </li>
            <li>
              <strong>$250</strong> contributes to their health care and
              well-being.
            </li>
          </ul>
        </div>
        <p>
          We guarantee that every contribution will be managed with utmost
          integrity and will go directly to support these individuals.
        </p>
        <p>
          Thank you for considering a gift to support these cherished members of
          our extended community. Your generosity will profoundly influence
          their lives and provide them with the resources they need to thrive.
        </p>

        <div class="flex flex-wrap justify-center gap-9 self-center">
          <div id="donate-button-container">
            <div id="donate-button" class="h-[54px] w-[151px]" />
          </div>
        </div>

        <p>
          <strong>Your gift is a blessing of hope</strong>
        </p>

        <div class="flex flex-col gap-1">
          <p>
            <strong>With gratitude and hope,</strong>
          </p>
          <p>
            <strong>Church AI</strong>
          </p>
        </div>
      </div>
    </PageLayout>
  );
});
