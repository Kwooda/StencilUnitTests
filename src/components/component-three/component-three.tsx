import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'component-three',
  styleUrl: 'component-three.css',
  shadow: true,
})
export class ComponentThree {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
