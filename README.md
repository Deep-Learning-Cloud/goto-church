# [church-ai.org](https://church-ai.org)

Generate church sign text using AI. Generate something random to get inspired, or enter something happening at your community to get the perfect text for your signs!

## Development

This project is built using [Node.js](https://nodejs.org), [NPM](https://npmjs.com) and [Qwik](https://qwik.dev). To get started with development, create a `.env.local` file with the following content:

```sh
OPENAI_API_KEY="your openai api key here"
```

And then run the following commands:

```sh
npm install
npm run dev
```

Now you can open your browser at [http://localhost:5173](http://localhost:5173) to see the app running. If something is already running on that port, the development server might choose a different port. Check your logs if that's the case.

## Choice of technology

Qwik was chosen for this project mainly because of its status as a relatively new framework in the JavaScript frontend world. The main feature that sets Qwik apart compared to other frameworks is "resumability" which allows apps to render on the server and later resume running on the client.

Other frameworks, like React, can render on the server, but the client is then tasked with rendering the app in the same way again but on the client. This causes many issues, most visible of which to developers is hydration errors that can occur when sourcing data that is not stateless, for example when rendering the current date or fetching data from other sources. Hydration errors occur when the server renders something different compared to the client, causing a mismatch in the final rendered DOM. Resumability, since it doesn't require a re-render, will never fail to hydrate since there is no hydration phase, but rather the application immediately resumes from the state that was created on the server once the client receives it.

Among the other new frontend framework contenders, Solid was considered as another JSX based framework. Solid is more similar to React in how it is not intrinsically tied to the server like Qwik is but rather is primarily made for client applications. Both Qwik and Solid use "signals" for state management, while React has multiple ways to manage state but most commonly uses its "hooks".

In retrospect, Qwik (and Qwik City, Qwik's [meta framework](https://prismic.io/blog/javascript-meta-frameworks-ecosystem)) was not the correct choice for this project as the application ended up primarily running on the client side, something which quickly was noticed as a detriment in developing the application. Had a database been used, [Qwik City's actions](https://qwik.dev/docs/action/#routeaction) would have been appropriate to use for form submissions which would have allowed the application to run completely on the server. This would in turn make is possible for user even with JavaScript disabled to use the application fully.

As it is, React or Solid would have been more appropriate frameworks to choose, but the experience of building in Qwik made clear its strengths and weaknesses in comparison to other frameworks:

| Framework | Meta framework | Runs w/o JS? | State management     | Can run only on client? | Component function runs |
| --------- | -------------- | ------------ | -------------------- | ----------------------- | ----------------------- |
| Qwik      | Qwik City      | ✅           | Signals              | ❌                      | On render               |
| Solid     | Solid Start    | ❌           | Signals              | ✅                      | On start                |
| React     | Next.js        | ❌           | Hooks (among others) | ✅                      | On render               |

With that comparison in mind, the best choice for this project (provided no database is to be used in the future and that the goal was to try a newer framework) would have been to use Solid.
