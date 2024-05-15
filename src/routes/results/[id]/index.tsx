import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Quote } from "~/components/quote";
import type { GenerateRequest } from "~/utils/store";
import { getGenerateRequest, saveGenerateRequest } from "~/utils/store";
import "./loader.css";
import { nanoid } from "nanoid";
import { Header } from "~/components/header";

// We have a new support group for people with mental health issues, meetings on Saturdays at 1 pm

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  const generateRequest = useSignal<GenerateRequest>();
  const results = useSignal<string[]>();

  useVisibleTask$(async ({ track }) => {
    track(() => loc.params.id);

    results.value = undefined;
    generateRequest.value = undefined;

    const req = await getGenerateRequest(loc.params.id);
    generateRequest.value = req;

    if (!req) {
      nav("/");
      return;
    }

    if (req.results?.length) {
      results.value = req.results;
      return;
    }

    let body = null;
    if (req.input) {
      if (req.input.type === "regenerate") {
        body = { regenerate: req.input.original };
      } else {
        body = { text: req.input.value };
      }
    }

    const result = await fetch("/api/generate", {
      method: "POST",
      body: body != null ? JSON.stringify(body) : undefined,
    }).then((res) => res.json());

    req.results = result;
    results.value = result;

    saveGenerateRequest(req);
  });

  const regenerate$ = $(async (text: string) => {
    const id = nanoid(10);
    await saveGenerateRequest({
      id,
      createdAt: new Date().toISOString(),
      input: { type: "regenerate", original: text },
    });
    await nav(`/results/${id}`);
  });

  if (!results.value) {
    return (
      <div class="flex w-full flex-col items-center gap-8 p-12 font-serif text-xl font-bold text-purple">
        Getting your quotes, hang on a moment...
        <span class="loader" />
      </div>
    );
  }

  return (
    <div class="flex flex-col items-center gap-16 p-16">
      <Header />
      <div class="flex w-full max-w-3xl flex-col items-center gap-6 text-center font-serif font-bold text-purple">
        <h1 class="text-5xl leading-snug">Here are your quotes</h1>
        <div class="max-w-xl text-xl">
          <Link href="/">
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-6 w-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              Go back
            </Button>
          </Link>
        </div>
        {generateRequest.value?.input?.type === "input" && (
          <p class="text-center font-sans text-xl text-purple">
            What's happening: {generateRequest.value.input.value}
          </p>
        )}
        {generateRequest.value?.input?.type === "regenerate" && (
          <p class="text-center font-sans text-xl text-purple">
            Original text: {generateRequest.value.input.original}
          </p>
        )}
        {generateRequest.value && generateRequest.value.input == null && (
          <p class="text-center font-sans text-xl text-purple">Random quote</p>
        )}
      </div>

      <div class="flex max-w-4xl flex-col flex-wrap justify-stretch gap-10 [&>*]:min-w-[200px] [&>*]:flex-auto [&>*]:basis-[25%]">
        {results.value.map((quote) => (
          <Quote key={quote}>
            {quote}
            <div q:slot="actions">
              <Button
                size="sm"
                variant="secondary"
                onClick$={() => {
                  regenerate$(quote);
                }}
              >
                Regenerate
              </Button>
            </div>
          </Quote>
        ))}
      </div>
    </div>
  );
});
