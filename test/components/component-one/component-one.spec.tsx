import { newSpecPage } from '@stencil/core/testing';
import { ComponentOne } from '../../../src/components/component-one/component-one';

describe('component-one', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [ComponentOne],
			html: `<component-one></component-one>`,
		});
		expect(page.root).toEqualHtml(`
      <component-one>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </component-one>
    `);
	});
});
