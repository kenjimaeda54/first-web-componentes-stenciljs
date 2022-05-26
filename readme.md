# Slide Drawer
Pequeno slide drawer com stenciljs

## Motivação
Entender como esta ferramenta pode auxiliar construção de web componentes 


## Feature
- Stencil utiliza conceito decorador do typescript, para representar  props, estados,métodos
- Stencil esta muito próximo ao React, trabalhamos com props sendo imutáveis são estados mutáveis
- Props tem mesmo principio do React, passagem de valores entre componentes pais e filhos
- Decorador @Prop permite usarmos um método mutable, com esse método eu consigo inferir novos valores para prop
- Decorador @Method permite usarmos um método como publico, ou seja acessado fora da classe
- Metodo reflect é útil para refletir as mudanças das props em todos lugares. Exemplo: <kvm-side-drawer titlemenu>
- titlemenu precisam ser minusculo, não permite camel case 
- Exemplo abaixo consigo acessar o método open, porque tem o decorador @Method
- Observa no exemplo abaixo que consigo mudar opened, porque esta mutable 
  
``` ts
  
export class SideDrawer {    
 @Prop({ reflect: true }) titlemenu: string;
 @Prop({ reflect: true, mutable: true }) opened: boolean;
  
  
   handleModal() {
    this.opened = false;
  }
  
  @Method()
  async open() {
    this.opened = true;
  }
  
}
```
  
```html
  <button>Click open drawer</button>
    <kvm-side-drawer titleMenu="Main menu">
      <!--consigo por causa do slot-->
      <nav class="side-navigation">
        <ul>
          <li>
            <a href="/">A link</a>
          </li>
          <li>
            <a href="/">Other link</a>
          </li>
          <li>
            <a href="/">Third link</a>
          </li>
        </ul>
      </nav>
    </kvm-side-drawer>
    <script>
      const sideDrawer = document.querySelector('kvm-side-drawer');
      const buttonOpen = document.querySelector('button');
      buttonOpen.addEventListener('click', () => {
        sideDrawer.open();
      });
    </script>  
  
```  
  
##
  
- Para manipular logica de negócio usamos decorador @State()
- Principio é idêntico ao react ,diferença que não preciso atualizar o valor com set
- Stencil também pode apenas um filho se deseja retornar mais que um,precisa ser um array é no primeiro filho colocar,
- Todos recursos do web componentes estão disponíveis aqui, shadow root,custom tag,slot, host...
- Usamos decorador chamado @Componente, tag sera o nome da tag em si,styleUrl é o caminho relativo do css e shadow  permitir ser shadow down
- Também consigo estilizar em line  mudando styleUrl por outra propriedade  
  
 ``` ts

@Component({
  tag: 'kvm-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export  
export class SideDrawer {  
  handleContactInfo(type: string) {
    this.showContactInfo = type === 'navigation';
  } 
 
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
  
  
  ```
  
  
  
  
  
  
  
  
  
