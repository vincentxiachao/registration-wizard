import {
  RegisterFooter,
  type RegisterFooterProps,
} from '@features/register/components/RegisterFooter';
import { render } from '@testing-library/react';
import { beforeAll, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
describe('RegisterFooter', () => {
  const mockProps: RegisterFooterProps = {
    steps: [],
    activeStep: 0,
    disableNext: false,
    submissionDone: false,
    testIdPrefix: 'mock-prefix',
    handleBack: vi.fn(),
    handleNext: vi.fn(),
    handleSubmit: vi.fn(),
  };
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18next}>
        <RegisterFooter {...mockProps} />
      </I18nextProvider>
    );
  });
  beforeAll(() => {});
  afterAll(() => {});
  it('should render expected buttons', () => {
    const previousButton = screen.queryByTestId(
      `${mockProps.testIdPrefix}-previous-button`
    );

    // const nextButton = await screen.findByTestId(
    //   `${mockProps.testIdPrefix}-button-container`
    // );

    expect(previousButton).not.toBeInTheDocument();
    // expect(nextButton).toBeInTheDocument();
  });
});
