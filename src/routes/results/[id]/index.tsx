import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Quote } from "~/components/quote";
import { getGenerateRequest, saveGenerateRequest } from "~/utils/store";
import "./loader.css";

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  const id = loc.params.id as string;

  const results = useSignal<string[]>();

  useVisibleTask$(async () => {
    if ((results.value?.length ?? 0) > 0) return;

    const req = await getGenerateRequest(id);

    if (!req) {
      nav("/");
      return;
    }

    if (req.results?.length) {
      results.value = req.results;
      return;
    }

    const result = await fetch("/api/generate-random").then((res) =>
      res.json(),
    );

    req.results = result;
    results.value = result;

    saveGenerateRequest(req);
  });

  if (!results.value) {
    return (
      <div class="flex w-full flex-col items-center gap-8 p-12 font-serif text-xl font-bold">
        Getting your quotes, hang on a moment...
        <span class="loader" />
      </div>
    );
  }

  return (
    <div class="flex flex-col items-center gap-16 p-16">
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
      </div>

      <div class="flex max-w-4xl flex-col flex-wrap justify-stretch gap-10 [&>*]:min-w-[200px] [&>*]:flex-auto [&>*]:basis-[25%]">
        {results.value.map((quote) => (
          <Quote key={quote}>
            {quote}
            <div q:slot="actions">
              <Button size="sm" variant="secondary">
                Regenerate
              </Button>
            </div>
          </Quote>
        ))}
      </div>
    </div>
  );
});
