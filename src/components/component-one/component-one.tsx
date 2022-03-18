import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'component-one',
  styleUrl: 'component-one.css',
  shadow: true,
})
export class ComponentOne {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
