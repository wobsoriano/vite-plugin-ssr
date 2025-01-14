export { StaticHostDocIntro }
export { StaticHostDocStrategies }
export { StaticHostDocOutro }

import React from 'react'

function StaticHostDocIntro({ staticHostLink }: { staticHostLink?: JSX.Element }) {
  return (
    <p>
      By <a href="/pre-rendering">pre-rendering</a> your pages, you can remove the need for a production server. You can
      then deploy your app to any static host
      {staticHostLink}.
    </p>
  )
}
function StaticHostDocStrategies({ name = 'the static host' }: { name?: string }) {
  return (
    <>
      <p>You can choose between following deploy strategies:</p>
      <ul>
        <li>
          Build locally and upload <code>dist/client/</code> to {name}.
        </li>
        <li>
          Let a <a href="https://github.com/features/actions">GitHub action</a> build and upload{' '}
          <code>dist/client/</code> to {name}.
        </li>
        <li>Let {name} build your app.</li>
      </ul>
    </>
  )
}
function StaticHostDocOutro({ baseUrlAddendum }: { baseUrlAddendum?: JSX.Element }) {
  return (
    <>
      <p>
        {' '}
        You can try out your production build locally with{' '}
        <a href="https://vitejs.dev/guide/cli.html#vite-preview">
          <code>$ vite preview</code>
        </a>
        , or any other tool such as{' '}
        <a href="https://www.npmjs.com/package/serve">
          <code>$ serve dist/client/</code>
        </a>
        .
      </p>
      <blockquote>
        <p>
          The <code>$ vite build</code> command generates a directory <code>dist/client/</code> that contains all static
          assets.
        </p>
      </blockquote>
      <blockquote>
        <p>
          If you don't deploy your app at your domain root <code>https://my-domain.com</code>, but at{' '}
          <code>https://my-domain.com/somewhere/nested</code> instead, then{' '}
          <a href="/base-url">change your app's Base URL</a>.{baseUrlAddendum}
        </p>
      </blockquote>
    </>
  )
}
