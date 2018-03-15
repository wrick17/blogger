class ActionButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="action-button">
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i className="material-icons">get_app</i>
          </button>
        </div>
        <style jsx>{`
          .action-button {
            position: fixed;
            bottom: 120px;
            right: 120px;
          }  
        `}</style>
      </React.Fragment>
    )
  }
}

export default ActionButton
