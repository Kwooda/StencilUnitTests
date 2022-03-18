import { Component, Element, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
// import { getId, getTabIndex } from '../../utils/utils';
// import { KDS } from '../../utils/kernel';

@Component({
	tag: 'kds-price-story',
	styleUrl: 'price-story.scss',
	shadow: false,

})

export class PriceStory {
	@Element() element: HTMLElement;
	// Component configuration properties
	@Prop({ mutable: true }) size: string = 'mobile';  //mobile, desktop
	@Prop() orientation: string = 'horizontal'; // horizontal, vertical
	@Prop() alignment: string = "left"; //left, right
	// Data properties
	@Prop({ attribute: 'sale-price' }) salePrice?: number = 0;
	@Prop({ attribute: 'sale-price-label' }) salePriceLabel?: string;
	@Prop({ attribute: 'regular-price' }) regularPrice?: number = 0;
	@Prop({ attribute: 'regular-price-label' }) regularPriceLabel?: string;
	// "Your price" info
	@Prop({ attribute: 'your-price' }) yourPrice?: number = 0;
	@Prop({ attribute: 'your-price-label' }) yourPriceLabel?: string;
	@Prop({ attribute: 'coupon-code' }) couponCode?: string = 'code';
	@Prop({ attribute: 'percentage-off' }) percentageOff?: number = 0;
	@Prop({ attribute: 'bottom-right-message' }) bottomRightMessage?: string;
	@Prop({ attribute: 'info-message' }) infoMessage?: string = 'details';
	// JSON data property - alternative to all the above data properties
	@Prop({ attribute: 'price-data' }) priceData?: string;

	@Event() infoIconEvent: EventEmitter<any>;
	@State() toolTipWidth: string;
	tabIndex: number; //derived from this.element.tabindex
	psContent: HTMLElement;
	hasSalePriceStory: boolean;
	priceJsonData: any;
	isYourPrice!: boolean;

	constructor() {
		this.element.id = this.element.id || 'test123'; //getId(this.element.id);
		this.tabIndex = -1; //getTabIndex(this.element);
		this.element.tabIndex = -1;
	}

	@Watch('priceData')
	parseJson() {
		if (this.priceData) {
			var component = this;
			var priceData = component.priceData; // KDS.resolver.$v(component.priceData, KDS.global);
			this.priceJsonData = (typeof priceData == 'string') ? JSON.parse(priceData || '[]') : priceData || [];
		}
		else {
			this.priceJsonData = {
				salePrice: this.salePrice,
				salePriceLabel: this.salePriceLabel,
				regularPrice: this.regularPrice,
				regularPriceLabel: this.regularPriceLabel,
				yourPriceInfo: (this.yourPrice) ? {
					yourPrice: this.yourPrice,
					yourPriceLabel: this.yourPriceLabel,
					couponCode: this.couponCode,
					percentageOff: this.percentageOff,
					bottomRightMessage: this.bottomRightMessage,
					infoMessage: this.infoMessage
				} : null
			}
		}
	}

	componentWillRender() {
		this.parseJson();
		this.hasSalePriceStory = !!this.priceJsonData.salePrice;  // typecasting to a boolean
		// Define isYourPrice to reflect if yourPrice data is provided
		this.isYourPrice = !!this.priceJsonData.yourPriceInfo && !!this.priceJsonData.yourPriceInfo.yourPrice;
		// If yourPrice data is provided, assume "desktop" sizing as no mobile design is implemented
		if (this.isYourPrice) {
			this.size = 'desktop';
		}
	}

	renderNbsp() {
		if (this.orientation === 'horizontal' && !this.hasSalePriceStory) {
			return (<div>&nbsp;</div>)
		}
		if (this.hasSalePriceStory) {
			return (<div>&nbsp;</div>)
		}
		if (this.hasSalePriceStory && this.alignment === 'right' && this.orientation === 'horizontal') {
			return (<div>&nbsp;</div>)
		}
		if (this.isYourPrice) {
			return (<div>&nbsp;</div>)
		}

	}

	renderSalePrice() {
		return (
			<div class="sale-price-container">
				<div class={['regular-container', this.hasSalePriceStory ? '' : 'dominant'].join(' ')}>
					<span class="regular-price-label">{this.priceJsonData.regularPriceLabel}</span>
					{this.renderNbsp()}
					<span class="regular-price">{`$${Number(this.priceJsonData.regularPrice).toFixed(2)}`}</span>
				</div>
				{this.hasSalePriceStory &&
					<div class="sale-container dominant">&nbsp;
						<span class={`sale-price-label ${this.alignment}`}>{this.priceJsonData.salePriceLabel}</span>
						&nbsp;
						<span class="sale-price">{`$${Number(this.priceJsonData.salePrice).toFixed(2)}`}</span>
					</div>
				}
			</div>
		)
	}

	renderYourPrice() {
		// Reference to yourPriceInfo object for convenience
		var yourPriceInfo = this.priceJsonData.yourPriceInfo;
		return (
			<div class="all-price-container">
				<div class="regular-sale-container">
					<div class="sale-container">
						<span class={`sale-price-label ${this.alignment}`}>{this.priceJsonData.salePriceLabel}</span>
						&nbsp;
						<span class="sale-price">{`$${Number(this.priceJsonData.salePrice).toFixed(2)}`}</span>
					</div>&nbsp;
					<div class="regular-container">
						<span class="regular-price-label">{this.priceJsonData.regularPriceLabel}</span>
						{this.renderNbsp()}
						<span class="regular-price">{`$${Number(this.priceJsonData.regularPrice).toFixed(2)}`}</span>
					</div>
				</div>
				<div class="your-price-story-container">
					<div class="your-price-container">
						<div class="your-price">{`$${Number(yourPriceInfo.yourPrice).toFixed(2)}`}</div>
						&nbsp;
						<div class="your-price-label"> {yourPriceInfo.yourPriceLabel}</div>
					</div>
					<div class="bottom-your-price">
						<span class="coupon-code">{yourPriceInfo.couponCode}</span>
						&nbsp;
						<span class="percentage">({yourPriceInfo.percentageOff}% Off) </span>
						<sup>
							<kds-tooltip tooltip-type="price-story">
								<span
									class="info-icon"
									tabindex="0"
									onKeyPress={(e) => { this.handleEnterKeyPress(e); }}
									onClick={(e) => { this.handleClick(e); }}>
								</span>
								<div style={{ 'width': this.toolTipWidth }} slot="tooltip">{yourPriceInfo.infoMessage}</div>
							</kds-tooltip>
						</sup>
						<span class="bottom-right">{yourPriceInfo.bottomRightMessage}</span>
					</div>
				</div>
			</div>
		)
	}

	handleEnterKeyPress(ev: KeyboardEvent) {
		if (ev.key == 'Enter') {
			this.infoIconEvent.emit({ type: 'keypress' });
		}
	}

	handleClick(e) {
		e.preventDefault();
		this.infoIconEvent.emit({ type: 'click' });
	}

	renderPriceStory() {
		if (this.isYourPrice) {
			return this.renderYourPrice();
		}
		return this.renderSalePrice();
	}

	render() {
		return (
			<div class="kds">
				<div class={`kds-price-story ${this.size} ${this.alignment} ${this.orientation}`} ref={(el) => this.psContent = el as HTMLElement}>
					{this.renderPriceStory()}
				</div>
			</div>
		)
	}
}