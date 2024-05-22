import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Quote } from "~/components/quote";
import type { GenerateRequest } from "~/utils/store";
import { getGenerateRequest, saveGenerateRequest } from "~/utils/store";
import "./loader.css";
import { nanoid } from "nanoid";
import { PageLayout } from "~/components/page-layout";

// We have a new support group for people with mental health issues, meetings on Saturdays at 1 pm

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  const generateRequest = useSignal<GenerateRequest>();
  const results = useSignal<string[]>();
  const error = useSignal<string>();

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

    let result;
    try {
      result = await fetch("/api/generate", {
        method: "POST",
        body: body != null ? JSON.stringify(body) : undefined,
        headers:
          body != null
            ? {
                "Content-Type": "application/json",
              }
            : undefined,
      }).then((res) => res.json());
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return;
    }

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

  if (error.value) {
    return (
      <PageLayout>
        <h2 class="text-center font-serif text-4xl leading-snug" q:slot="head">
          An error occurred
        </h2>
        {error.value}
      </PageLayout>
    );
  }

  if (!results.value) {
    return (
      <PageLayout>
        <h2 q:slot="head" class="font-serif text-xl font-bold text-purple">
          Getting your quotes, hang on a moment...
        </h2>
        <div class="flex w-full flex-col items-center gap-8 p-12">
          <span class="loader" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div
        class="flex w-full max-w-3xl flex-col items-center gap-6 text-center font-serif font-bold text-purple"
        q:slot="head"
      >
        <h1 class="text-5xl leading-snug">Here are your quotes</h1>
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
    </PageLayout>
  );
});
