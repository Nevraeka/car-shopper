(function (document, window) {

  if(!window.customElements || !HTMLElement.prototype.attachShadow) {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-sd-ce.js', loadCarShopper)
  } else {
    loadCarShopper();
  }
  

  function loadScript(url, callback){
      const script = document.createElement("script")
      script.type = "text/javascript";
      if (script.readyState){
          script.onreadystatechange = function(){
              if (script.readyState === "loaded" || script.readyState === "complete"){
                  script.onreadystatechange = null;
                  callback();
              }
          };
      } else {
          script.onload = function (){ callback() };
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
  }

  function loadCarShopper() {
    if (!window.customElements.get('car-shopper')) {
      window.customElements.define('car-shopper',
        class CarShopper extends HTMLElement {

          static get observedAttributes() { return ['year', 'make', 'model', 'range', 'zip-code']; }

          constructor() {
            super();
            this._root = null;
            this._state = {
              year: '',
              make: '',
              model: '',
              range: '',
              zipCode: ''
            };
          }

          connectedCallback() {
            if (this._root === null) {
              if (!!this.attachShadow) {
                this._root = this.attachShadow({ mode: "open" });
              } else {
                this._root = this;
              }
            }
            render(this);
          }

          attributeChangedCallback(name, oldValue, newValue) {
            if (newValue === oldValue) { return };
            if (name === 'year') { this._state.year = newValue; }
            if (name === 'make') { this._state.make = newValue }
            if (name === 'model') { this._state.model = newValue; }
            if (name === 'range') { this._state.range = newValue; }
            if (name === 'zip-code') { this._state.zipCode = newValue }
            render(this);
          }

          get make() { return this._state.make; }
          get model() { return this._state.model; }
          get year() { return this._state.year; }
          get range() { return this._state.range; }
          get zipCode() { return this._state.zipCode; }
      });
    }
    
    function render(component) {
      if (window.ShadyCSS) { window.ShadyCSS.styleElement(component); }
      if(!!component._root) {
        let $template = document.createElement("template");
        $template.innerHTML = `
          <style>
            :host {
              overflow: hidden;
              display: block;
              width: 100%;
              max-width: 580px;
            }
            .car_shopper {
              font-family: 'Roboto', Helvetica, Arial, sans-serif;
              font-family: var(--particles--font-family, "Roboto", Helvetica, Arial, sans-serif );
              font-size: 14px;
              border-radius: 4px;
              border-radius: var(--particles--global-radius, 4px);
              display: flex;
              flex-direction: column;
              padding: 20px 15px;
              background-color: #D8E7FE;
              background-color: var(--car-shopper-bkg-color, #D8E7FE);
              font-weight: 300;
              width: inherit;
              max-width: 100%;
              box-sizing: border-box;
            }

            .car_shopper__fieldset {
              border-bottom: none;
              border-right: none;
              border-left: none;
              text-align: center;
              margin: 0;
              max-width: 100%;
              padding: 15px 0 0 0;
            }

            .car_shopper__legend {
              padding: 0 10px;
              font-weight: 500;
              color: #424242;
            }

            .car_shopper__inputs {
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 10px;
              margin: 10px 0 20px 0;
              min-width: 100%;
            }

            *::slotted(h4) {
              color: #212121;
              font-weight: 500;
              font-size: 18px;
              line-height: 21px;
              display: flex;
              align-items: center;
              width: 100%;
              margin: 0;
              padding: 0;
            }

            *::slotted(p) {
              margin: 10px 0;
            }

            *::slotted(select-input) {
              margin: 5px 0;
              min-width: 100%;
              grid-column: 1 / -1;
            }

            *::slotted(action-button) {
              width: 100%;
              margin: 10px 0 0 0;
            }
 
            .car_selector__postalrange {
              display: flex;
              align-items: center;
            }

            .car_selector__postalrange > span {
              white-space: nowrap;
            }

            .car_selector__postalrange > span:first-of-type {
              padding: 10px 10px 10px 0;
            }

            .car_selector__postalrange > span:last-of-type {
              padding: 10px;
            }
          </style>
          <div class="car_shopper">
            <slot name="car-shopper-headline"></slot>
            <slot name="car-shopper-subhead"></slot>
            <div class="car_shopper__inputs">
              <slot name="car-shopper-makes"></slot>
              <slot name="car-shopper-models"></slot>
              <div class="car_selector__postalrange">
                <span>within</span>
                <text-input size="small"></text-input>
                <span>miles of</span>
                <text-input size="small"></text-input>
              </div>
            </div>
            <fieldset class="car_shopper__fieldset">
              <legend class="car_shopper__legend">Show Me Cars With</legend>
              <slot name="car-shopper--vhr-list"></slot>
            </fieldset>
            <slot name="car-shopper-submit"></slot>
          </div>
          `;
        if (window.ShadyCSS) { window.ShadyCSS.prepareTemplate($template, 'car-shopper'); }
        component._root.appendChild(document.importNode($template.content, true));
    
      }
    }
  }
})(document, window);
                  