const AdminStyles = (props) => (
  <React.Fragment>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.css"/>
    {props.children}
    <style jsx global>{`
      body {
        margin: 0;
        min-height: 100vh;
      }
      .fixer {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .main-content {
        display: flex;
        flex: 1 0;
        align-items: flex-start;
      }
      .paddingmore {
        display: flex;
        flex-direction: column;
        flex: 1 0;
        overflow: auto;
      }
      .paddingmore.mdc-list {
        padding: 10px;
      }
      .paddingmore.mdc-list > * {
        width: 100%;
        margin-bottom: 10px;
        margin-top: 20px;
        flex: 0 0 auto;
      }
      .paddingmore.mdc-list textarea {
        resize: vertical;
      }
      .paddingmore.mdc-list .spacer {
        flex: 0 0 0;
      }
      .paddingmore.mdc-list .button-group {
        display: flex;
        margin: 0 0 10px;
      }  
      .button {
        flex: 1 0;
      }
      .button-gap {
        margin-right: 10px;
      }
      .page-content {
        flex: 1 0;
        max-height: 100%;
        overflow: auto;
      }
      .paddingmore.mdc-list .sidebar-image {
        margin-top: 0;
      }
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }
      .title {
        display: block;
        padding: 20px;
      }
      .cards-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        list-style: none;
        padding-left: 0;
      }
      .list-card {
        min-height: 0;
        padding: 20px;
        flex: 1 0 320px;
        max-width: calc(50% - 40px);
      }
      @media (max-width: 768px) {
        .cards-container {
          flex-direction: column;
          justify-content: center;              
        }
        .list-card {
          flex: 1 0 100%;
          max-width: 400px;
        }
      }
      .list {
        padding: 0 20px;
      }
      .mdc-card.list-item {
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        margin-bottom: 20px;
      }
      .list-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mdc-drawer--permanent.drawer {
        height: 100%;
        width: 300px;
      }
    `}</style>
  </React.Fragment>
)

export default AdminStyles
