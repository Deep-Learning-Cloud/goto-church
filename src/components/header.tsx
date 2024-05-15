import { component$ } from "@builder.io/qwik";
import logo from "./logo-text.svg";
import { Link } from "@builder.io/qwik-city";

export const Header = component$(() => {
  return (
    <header class="flex min-h-[90px] w-full flex-wrap items-center justify-between gap-10 rounded-[50px] bg-white px-10 py-5 text-[#875E90]">
      <img src={logo} alt="logo" width="260" height="50" />
      <div class="flex flex-wrap items-center justify-center gap-10 font-sans text-2xl font-bold">
        <Link href="/">Home</Link>
        <Link href="/mission">Mission</Link>
        <Link href="/donate">Donate</Link>
        <Link href="/disclosure">Disclosure</Link>
      </div>
    </header>
  );
});
