import { component$, useSignal, $ } from "@builder.io/qwik";
import { Button } from "./button";
import { nanoid } from "nanoid";
import { saveGenerateRequest } from "~/utils/store";
import { useNavigate } from "@builder.io/qwik-city";

export const PrayArea = component$(() => {
  const showTextBox = useSignal(false);

  const textArea = useSignal<HTMLTextAreaElement>();
  const textAreaValue = useSignal<string>();

  const nav = useNavigate();

  const generateRandom = $(async () => {
    const id = nanoid(10);
    await saveGenerateRequest({
      id,
      createdAt: new Date().toISOString(),
    });
    await nav(`/results/${id}`);
  });

  return (
    <div class="flex flex-col items-center gap-4">
      {!showTextBox.value && (
        <>
          <Button onClick$={generateRandom}>Generate random quote</Button>
          <span class="text-center font-sans text-xl font-bold text-purple">
            OR
          </span>
        </>
      )}
      <div
        class="cursor-text resize-none rounded border border-purple/10 bg-white font-sans text-[0px] text-purple"
        onClick$={() => {
          if (showTextBox.value) return;

          showTextBox.value = true;
          setTimeout(() => {
            console.log(textArea.value);
            textArea.value?.focus();
          }, 0);
        }}
      >
        <div
          class={[
            "px-7 py-4 text-xl text-purple/50",
            {
              hidden: showTextBox.value,
            },
          ]}
        >
          Tell us what the occasion is...
        </div>
        <textarea
          ref={textArea}
          role="textbox"
          aria-placeholder="Tell us what the occasion is..."
          class={[
            "h-[200px] max-h-[70vh] w-screen max-w-xl px-7 py-4 text-xl",
            { hidden: !showTextBox.value },
          ]}
          bind:value={textAreaValue}
          onBlur$={() => {
            const v = textAreaValue.value?.trim();
            if (v === "" || v == null) {
              showTextBox.value = false;
            }
          }}
        />
      </div>

      {showTextBox.value && (
        <button class="rounded bg-purple px-7 py-4 text-center font-sans text-xl font-bold text-white">
          Generate quote
        </button>
      )}
    </div>
  );
});
