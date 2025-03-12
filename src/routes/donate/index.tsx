import { Button } from "~/components/button";
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

        <div class="flex justify-center">
          <Button size="sm" color="green" onClick$={() => window.location.href = 'https://www.iasmembership.org/donation/'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
              clip-rule="evenodd"
            />
          </svg>
          Help children in need
        </Button>
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
