//custom class
var myGameInstance = null;

class UnityComp extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = this.template;
  }

  get template() {
    return `
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
  }

  //This needs to be attached to the script on the page
  get script(){
    return `
    <script>
      function receiveMessageFromUnity(txt) {
        // Get element to assign the message
        const lblMessage = document.getElementById("lblMessage");

        // Assign received from Unity message
        lblMessage.innerText = txt;
      }    
    </script>
    `
  }

  connectedCallback() {
    const root = this;
    const container = root.querySelector("#unity-container");
    const canvas = root.querySelector("#unity-canvas");
    const loadingBar = root.querySelector("#unity-loading-bar");
    const progressBarFull = root.querySelector("#unity-progress-bar-full");
    const fullscreenButton = root.querySelector("#unity-fullscreen-button");
    const warningBanner = root.querySelector("#unity-warning");

    console.log("1", container);

    function unityShowBanner(msg, type) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      }
      var div = root.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type == 'error') div.style = 'background: red; padding: 10px;';
      else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function () {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    console.log("2");

    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/WebGL Build.loader.js";
    var config = {
      dataUrl: buildUrl + "/WebGL Build.data",
      frameworkUrl: buildUrl + "/WebGL Build.framework.js",
      codeUrl: buildUrl + "/WebGL Build.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "WebGL Test",
      productVersion: "1.0",
      showBanner: unityShowBanner,
    };

    // By default Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:

      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      // config.devicePixelRatio = 1;

      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      unityShowBanner('WebGL builds are not supported on mobile devices.');
    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

      canvas.style.width = "700px";
      canvas.style.height = "440px";
    }

    loadingBar.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        myGameInstance = unityInstance;
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message) => {
        alert(message);
      });
    };
    root.appendChild(script);
  }

  listen1(el) {
    el.addEventListener('click', function (){
      // Get the input field
      const txtMessage = document.getElementById("txtMessage");

      // Get the message
      const message = txtMessage.value;

      // Clear the input field
      txtMessage.value = "";

      // Send message to the Unity scene
      // Params: "Target object in the scene", "Function name", "Parameters"
      myGameInstance.SendMessage("[Bridge]", "ReceiveMessageFromPage", message);
    })
  }

  listen2(el) {
    el.addEventListener('click', function (){
      const txtMessage = document.getElementById("numMessage");
      const message = txtMessage.value;
      txtMessage.value = "";

      // Send message to the Unity scene
      myGameInstance.SendMessage("[Bridge]", "ReceiveNumberFromPage", parseInt(message));
    })
  }

  listen3(el){
    el.addEventListener('click', function (){
      // Get the first json element
      const txtMessage = document.getElementById("jsonMessage1");
      const message = txtMessage.value;
      txtMessage.value = "";

      // Clear the input field
      const intMessage = document.getElementById("jsonMessage2");
      const value = intMessage.value;
      intMessage.value = "";

      var JsonObj = {
        "name":message,
        "value":parseInt(value)
      }

      var jsonString = JSON.stringify(JsonObj)

      // Send message to the Unity scene
      myGameInstance.SendMessage("[Bridge]", "RecieveJsonFromPage", jsonString);
    })
  }
}

//define the custom element class
window.customElements.define('unity-comp', UnityComp)

document.querySelector('unity-comp').listen1(document.getElementById('txtMessageBttn'))
document.querySelector('unity-comp').listen2(document.getElementById('numBttn'))
document.querySelector('unity-comp').listen3(document.getElementById('jsonBttn'))