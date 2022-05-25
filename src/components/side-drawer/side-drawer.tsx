import { Component, Prop, h } from '@stencil/core';
//tag e o nome da nossa tag que vai ser chamado no index.html
@Component({
  tag: 'kvm-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  //prop sera um listener que vai olhar nossa propriedade,nesse caso title
  //em nossa tag agora consigo acessar o title
  //se a props mudar nao ira refletir na tag,por exemplo title ="banana"
  //sem reflect se o title mudar para pera,nao sera refletido no html,com a propriedade reflect ambos mudam
  @Prop({ reflect: true }) titlemenu: string; //nao pode camel case
  @Prop({ reflect: true }) opened: boolean;
  render() {
    return (
      <aside>
        <header>
          <h1>{this.titlemenu}</h1>
        </header>
        <main>
          <slot></slot>
        </main>
      </aside>
    );
  }
}
