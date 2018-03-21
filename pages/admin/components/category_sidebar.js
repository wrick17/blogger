class CategorySideBar extends React.Component {

  handleChange = (field, value) => {
    if (this.props.onChange) this.props.onChange(field, value);
  }

  render() {
    if (!this.props.category) return null;
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Dashboard</span>
        <div className="option-fields">
          
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" type="text" id="sidebar-category-title" placeholder="" value={this.props.category.title} onChange={e => this.handleChange('title', e.target.value)} />
            <label className="mdl-textfield__label" htmlFor="sidebar-category-title">Title</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" type="text" id="sidebar-category-handle" placeholder="Category Handle" disabled value={this.props.category.handle} onChange={e => this.handleChange('handle', e.target.value)} />
            <label className="mdl-textfield__label" htmlFor="sidebar-category-handle">Handle</label>
          </div>
          
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <textarea className="mdl-textfield__input" type="text" id="sidebar-category-description" placeholder="Category Description" value={this.props.category.description} onChange={e => this.handleChange('description', e.target.value)} rows="3" />
            <label className="mdl-textfield__label" htmlFor="sidebar-category-description">Description</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <textarea className="mdl-textfield__input" type="text" id="sidebar-category-introduction" placeholder="Category Introduction" value={this.props.category.introduction} onChange={e => this.handleChange('introduction', e.target.value)} rows="4" />
            <label className="mdl-textfield__label" htmlFor="sidebar-category-introduction">Introduction</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" type="text" id="sidebar-category-image" placeholder="Image Link" value={this.props.category.imageLink} onChange={e => this.handleChange('imageLink', e.target.value)} />
            <label className="mdl-textfield__label" htmlFor="sidebar-category-image">Image</label>
          </div>

          <div className="spacer"></div>

          <div className="button-group">
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" disabled={ !this.props.unsaved } onClick={this.props.onSave} >Save</button>
          </div>
          <div className="button-group">
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent some-gap" disabled={ !(!this.props.unsaved && this.props.category.hasOwnProperty('draft')) } onClick={this.props.onPublish} >Publish</button>
            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.props.onReset} disabled={ !this.props.category.hasOwnProperty('draft') } >Reset</button>
          </div>

        </div>
        <style jsx>{`
          .option-fields {
            padding: 10px;
            display: flex;
            flex-direction: column;
            height: calc(100% - 84px);
          }  
          .category-label {
            color: rgb(63,81,181) !important;
            font-size: 12px !important;
            top: 0px !important;
            visibility: visible !important;
          }
          .mdl-textfield__label {
            top: -10px !important;
          }
          .mdl-textfield {
            margin-top: 20px;
          }
          .full-width-button {
            width: 100%;
          }
          .button-gap {
            margin-top: 20px;
          }
          .some-gap {
            margin-right: 10px;
          }
          .full-width {
            width: 100%;
          }
          .button-group {
            display: flex;
            margin-top: 10px;
          }
          .button-group button {
            flex: 1;
          }
          .spacer {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

export default CategorySideBar
