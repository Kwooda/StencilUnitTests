import { newE2EPage } from '@stencil/core/testing';

describe('component-one', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<component-one></component-one>');

    const element = await page.find('component-one');
    expect(element).toHaveClass('hydrated');
  });
});
