import { Component, Prop, h, State, Method } from '@stencil/core';
//tag e o nome da nossa tag que vai ser chamado no index.html
@Component({
  tag: 'kvm-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false; //parecido conceito de react,props sao imutáveis e state e mutável
  //apesar da flexibilidade em colocar a propriedade mutable em Prop o recomendado e uso do State

  //prop sera um listener que vai olhar nossa propriedade,nesse caso title
  //em nossa tag agora consigo acessar o title
  //se a props mudar nao ira refletir na tag,por exemplo title ="banana"
  //sem reflect se o title mudar para pera,nao sera refletido no html,com a propriedade reflect ambos mudam
  @Prop({ reflect: true }) titlemenu: string; //nao pode camel case
  //props sao imutáveis para conseguir alterar preciso da propriedade mutable
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  handleModal() {
    this.opened = false;
  }

  handleContactInfo(type: string) {
    this.showContactInfo = type === 'navigation';
  }

  @Method() // para acessar um método fora da classe,assim consigo usar no html
  async open() {
    this.opened = true;
  }
  //para retornar dois elementos aqui usa []

  render() {
    return [
      <div class="background" onClick={this.handleModal.bind(this)} />,
      <aside>
        <header>
          <h1>{this.titlemenu}</h1>
          <button onClick={this.handleModal.bind(this)} class="close">
            x
          </button>
        </header>
        <main>
          <div class="tab">
            <button onClick={this.handleContactInfo.bind(this, 'contact')} class={!this.showContactInfo ? 'active' : ''}>
              Contact
            </button>
            <button onClick={this.handleContactInfo.bind(this, 'navigation')} class={this.showContactInfo ? 'active' : ''}>
              Navigation
            </button>
          </div>
          {!this.showContactInfo ? (
            <div class="main-contact">
              <h2>You contact our for:</h2>
              <ul>
                <a href="something@something">Email: something@something</a>
              </ul>
              <ul>
                <p>Phone: 343434343</p>
              </ul>
            </div>
          ) : (
            <slot />
          )}
        </main>
      </aside>,
    ];
  }
}
