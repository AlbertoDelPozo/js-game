class Cambio extends HTMLElement {
    constructor () {
        super ();
    }

    connectedCallback() {
        var num = 0;
        const colorbase = this.getAttribute('basecolor') || 'inherit';
        const colorcambio = this.getAttribute('alternativecolor') || 'transparent';
        const intervalo = (this.getAttribute('changeinterval') || 1)*1000;

        setInterval(() => {
            this.style.color = ++num % 2 ? colorcambio : colorbase;
        }, intervalo);
    }
}
customElements.define('wc-cambio', Cambio);

const templateInstuctions = document.createElement('template');

templateInstuctions.innerHTML = `
    <style>
        h1 {
            font-size: 3em;
        }
        template-instructions {
            font-family: 'Press Start 2P', cursive;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    </style>
    <template-instructions>
        <div>
            <h1>CAN GAME</h1>
        </div>
        <br>
        <div class="d-flex justify-content-center align-items-center flex-column">
            <p>1. Shoot all the guns to win before the time ends</p>
            <p>2. You can stop the game but you can't shoot at the cans when they don't move</p>
            <p>3. You can continue the game clicking RESTART</p>
            <p>4. To reload the game press RESET</p>
            <p>5. HAVE FUN :)</p>
        </div>
    </template-instructions>
`;

customElements.define('template-instructions',
    class extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow( { mode: 'open' });
            this._shadowRoot.appendChild(templateInstuctions.content.cloneNode(true));
        }
    }
)