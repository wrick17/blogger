import { adminFetch, handleize } from './utils';

class PostSideBar extends React.Component {

  state = {
    categories: []
  }

  handleChange = (field, value) => {
    const obj = { [field]: value };
    if (!this.props.post._id && field === 'title' && this.props.onChange) {
      obj.handle = handleize(value);
    }
    if (this.props.onChange) this.props.onChange(obj);
  }

  componentWillMount = () => {
    adminFetch('/api/admin/categories')
      .then(res => res.json())
      .then(categories => this.setState({ categories }))
      .catch(err => console.error(err))
  }

  generateListItems = (selectedCategory, categories) => {
    const categoriesList = [];
    return categories.map(category => {
      if ((category.handle === selectedCategory)) {
        return <li className="mdl-menu__item" onClick={() => this.handleChange('category', category.handle)} data-selected="true" key={category.handle} data-val={category.handle}>{category.title}</li>
      } else {
        return <li className="mdl-menu__item" onClick={() => this.handleChange('category', category.handle)} key={category.handle} data-val={category.handle}>{category.title}</li>
      }
    })
  }

  render() {
    if (!this.props.post) return null;
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Dashboard</span>
        <div className="option-fields">
          
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" type="text" id="sidebar-post-title" placeholder="" value={this.props.post.title} onChange={e => this.handleChange('title', e.target.value)} />
            <label className="mdl-textfield__label" htmlFor="sidebar-post-title">Title</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" type="text" id="sidebar-post-handle" placeholder="Post handle" value={this.props.post.handle} disabled={this.props.post._id ? true : false} onChange={e => this.handleChange('handle', e.target.value)} />
            <label className="mdl-textfield__label" htmlFor="sidebar-post-handle">Handle</label>
          </div>
          
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <textarea className="mdl-textfield__input" type="text" id="sidebar-post-description" placeholder="Post description" value={this.props.post.description} onChange={e => this.handleChange('description', e.target.value)} rows="3" />
            <label className="mdl-textfield__label" htmlFor="sidebar-post-description">Description</label>
          </div>
          
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
            <input type="text" value={this.state.categories[this.props.post.category]} className="mdl-textfield__input" id="sidebar-post-category" readOnly />
            <input type="hidden" value={this.state.categories[this.props.post.category]} name="sidebar-post-category" />
            <i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
            <label htmlFor="sidebar-post-category" className="mdl-textfield__label category-label">Category</label>
            <ul htmlFor="sidebar-post-category" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
              { this.generateListItems(this.props.post.category, this.state.categories) }
            </ul>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" type="text" id="sidebar-post-image" placeholder="Image link" value={this.props.post.imageLink} onChange={e => this.handleChange('imageLink', e.target.value)} />
            <label className="mdl-textfield__label" htmlFor="sidebar-post-image">Image</label>
          </div>

          <div className="spacer"></div>

          <div className="button-group">
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" disabled={ !this.props.unsaved } onClick={this.props.onSave} >Save</button>
          </div>
          <div className="button-group">
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent some-gap" disabled={ !(!this.props.unsaved && this.props.post.hasOwnProperty('draft')) } onClick={this.props.onPublish} >Publish</button>
            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.props.onReset} disabled={ !this.props.post.hasOwnProperty('draft') } >Reset</button>
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

export default PostSideBar
