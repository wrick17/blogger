const Loading = () => (
  <div className="loader">
    <div className="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>
    <style jsx>{`
      body {
        margin: 0;
      }
      .loader {
        text-align: center;
        height: 90vh;
      }
      .lds-ring {
        display: inline-block;
        margin: auto;
        margin-top: 50vh;
        transform: translateY(-50%);
        position: relative;
        width: 64px;
        height: 64px;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid #C2185B;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #C2185B transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
)

export default Loading
