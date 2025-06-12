import { render } from '@testing-library/react';
import i18next from 'i18next';
import type { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

export function RenderWithI18nProviders(ui: React.ReactElement) {
  function Wrapper({
    children,
  }: PropsWithChildren<unknown>): React.ReactElement {
    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
  }
  return { ...render(ui, { wrapper: Wrapper }) };
}
