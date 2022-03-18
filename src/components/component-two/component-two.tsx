import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'component-two',
  styleUrl: 'component-two.css',
  shadow: true,
})
export class ComponentTwo {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
