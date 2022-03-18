import { newE2EPage } from '@stencil/core/testing';

describe('component-three', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<component-three></component-three>');

    const element = await page.find('component-three');
    expect(element).toHaveClass('hydrated');
  });
});
