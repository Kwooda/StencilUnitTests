import { newSpecPage } from '@stencil/core/testing';
import { PriceStory } from '../../../src/components/price-story/price-story'

describe('price-story', () => {
	it('renders default', async () => {
		const { root } = await newSpecPage({
			components: [PriceStory],
			html: '<kds-price-story id="test"></kds-price-story>',
		});
		expect(root).toEqualHtml(`<kds-price-story id=\"test\" tabindex=\"-1\">
	<div class=\"kds\">
	  <div class=\"horizontal kds-price-story left mobile\">
		<div class=\"sale-price-container\">
		  <div class=\"dominant regular-container\">
			<span class=\"regular-price-label\"></span>
			<div></div>
			<span class=\"regular-price\">
			  $0.00
			</span>
		  </div>
		</div>
	  </div>
	</div>
  </kds-price-story>`);
	});

});