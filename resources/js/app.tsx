// app.tsx
import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from '@/Theme/theme-provider';
import { Toaster } from './Components/ui/Toaster';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    const Root = (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App {...props} />
        <Toaster />
      </ThemeProvider>
    );

    if (import.meta.env.SSR) {
      hydrateRoot(el, Root);
      return;
    }

    createRoot(el).render(Root);
  },
  progress: {
    color: '#4B5563'
  }
});
