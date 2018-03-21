function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const AdminStyles = () => (
  <div>
    <link key={makeid()} rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link key={makeid()} rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
    <link key={makeid()} rel="stylesheet" href="https://cdn.jsdelivr.net/npm/getmdl-select@2.0.1/getmdl-select.min.css" />
    {/* <script key={makeid()} src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script key={makeid()} src="https://cdn.jsdelivr.net/npm/getmdl-select@2.0.1/getmdl-select.min.js"></script> */}
  </div>
)

export default AdminStyles
