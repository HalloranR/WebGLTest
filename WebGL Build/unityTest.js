//custom template for the shadow DOM
const template = document.createElement('template');
template.innerHTML= `
<head>
  <link rel="shortcut icon" href="TemplateData/favicon.ico">
  <link rel="stylesheet" href="TemplateData/style.css">
</head>
<div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas" width=960 height=600></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo"></div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full"></div>
      </div>
    </div>
    <div id="unity-warning"> </div>
    <div id="unity-footer">
      <div id="unity-webgl-logo"></div>
      <div id="unity-fullscreen-button"></div>
      <div id="unity-build-title">WebGL Test</div>
    </div>
</div>
`;

//custom class
class UnityTest extends HTMLElement{
    constructor() {
        super();

        //create the shadow DOM
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connctedCallback() {
        console.log("Here is where I would start?");
    }
}


//define the class and use it
window.customElements.define('unity-test', UnityTest)