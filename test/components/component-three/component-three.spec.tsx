import { newSpecPage } from '@stencil/core/testing';
import { ComponentThree } from '../../../src/components/component-three/component-three';

describe('component-three', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [ComponentThree],
			html: `<component-three></component-three>`,
		});
		expect(page.root).toEqualHtml(`
      <component-three>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </component-three>
    `);
	});
});
