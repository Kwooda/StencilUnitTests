import { newE2EPage } from '@stencil/core/testing';
// import { delay } from '../../../src/utils/utils';

describe('kds-price-story', () => {
	it('renders basic', async () => {
		const page = await newE2EPage();

		await page.setContent('<kds-price-story></kds-price-story>');
		const element = await page.find('kds-price-story');
		expect(element).toBeTruthy();
	});

	it('should emit event when tabbing to info icon and pressing enter', async () => {
		const page = await newE2EPage();

		await page.setContent('<kds-price-story alignment="right" size="desktop" sale-price="32.99" sale-price-label="Sale" regular-price="35.00" regular-price-label="Reg." your-price="28.05" your-price-label="when you use" coupon-code="YOUR15" percentage-off="15" bottom-right-message="at checkout"></kds-price-story>');

		const component = await page.find('kds-price-story');
		const infoIcon = await page.find('.info-icon');        // const infoEl = infoIcon as HTMLElement;
		await page.waitForChanges();

		expect(infoIcon).toBeDefined;
		const iconEvent = await component.spyOnEvent('infoIconEvent');
		infoIcon.press('Enter', { delay: 50 });
		await page.waitForChanges();

		expect(iconEvent).toHaveReceivedEventDetail({ "type": "keypress" });
	});

	it('should emit click event when info icon is clicked', async () => {
		const page = await newE2EPage();

		await page.setContent(`<kds-price-story alignment="right" size="desktop" sale-price="32.99" sale-price-label="Sale" regular-price="35.00" regular-price-label="Reg." your-price="28.05" your-price-label="when you use" coupon-code="YOUR15" percentage-off="15" bottom-right-message="at checkout"></kds-price-story>`);
		await page.waitForChanges();
		const component = await page.find('kds-price-story');
		const infoIcon = await page.find('.info-icon');        // const infoEl = infoIcon as HTMLElement;
		expect(infoIcon).toBeDefined;
		const iconEvent = await component.spyOnEvent('infoIconEvent');

		infoIcon.click({ delay: 50 });
		await page.waitForChanges();
		expect(iconEvent).toHaveReceivedEvent();
	});

});