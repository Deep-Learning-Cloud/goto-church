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
        Support Our Mission
      </h1>

      <div class="flex max-w-4xl flex-col flex-wrap justify-stretch gap-10 text-center text-purple [&>*]:min-w-[200px] [&>*]:flex-auto [&>*]:basis-[25%] [&>*]:font-serif">
        <p>
          <strong>Dear Friends and Believers,</strong>
        </p>
        <p>
          Every donation, no matter how small, helps us cover our hosting fees
          and ensures that we can continue to offer a space where our faith and
          fellowship can flourish. Together, we can keep this important work
          going and make a lasting impact on the hearts and minds of our
          community members.
        </p>
        
        <div class="flex flex-wrap justify-center gap-9 self-center">
          <div id="donate-button-container">
            <div id="donate-button" class="h-[54px] w-[151px]" />
          </div>
        </div>

        <h2 class="text-center font-serif text-4xl leading-snug">
          About Our Mission
        </h2>
        <p>
          We have started an important journey to enhance our church communities
          by offering a platform that generates and shares inspiring quotes,
          enabling us to spread the message of faith and love. This website
          functions as a source of hope and harmony, and we are devoted to
          guaranteeing its ongoing support for our overall spiritual
          development.
        </p>
        <p>
          However, maintaining this platform comes with inevitable costs, and as
          a self-funded project, we face financial challenges in keeping this
          site active and accessible. We are reaching out to you, our community,
          to kindly ask for your support in sustaining this vital resource.
        </p>
        <div class="flex flex-col gap-1 text-start">
          <p>
            <strong>How Your Contribution Helps:</strong>
          </p>
          <ul class="list-inside list-disc text-start">
            <li>
              <strong>Server Costs:</strong> Keeping our website online 24/7 so
              it's always available when you need it.
            </li>
            <li>
              <strong>Development:</strong> Improving and expanding the features
              of our website to better serve our community's needs.
            </li>
          </ul>
        </div>
        <p>
          We believe in the power of community and the strength that comes from
          shared beliefs. With your support, we can continue to inspire,
          connect, and uplift each other through the powerful words of our
          faith.
        </p>
        <p>
          Please consider making a donation today. Every contribution brings us
          closer to continuing our mission and serving our cherished community.
        </p>
        <p>
          <strong>Thank you for your generosity and faith.</strong>
        </p>
        <div class="flex flex-col gap-1">
          <p>
            <strong>Blessings,</strong>
          </p>
          <p>
            <strong>Goto Church</strong>
          </p>
        </div>
      </div>
    </PageLayout>
  );
});
