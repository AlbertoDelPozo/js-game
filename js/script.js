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