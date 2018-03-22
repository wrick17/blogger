import { adminFetch, handleize } from './utils';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';

import NoSSR from 'react-no-ssr'

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

  componentDidMount = () => {
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
      <NoSSR>
        <Drawer permanent className="drawer">
          <DrawerContent className="paddingmore">
            <div className="button-group">
              <Button className="button" raised disabled={!this.props.unsaved} onClick={this.props.onSave} >Save</Button>
            </div>
            <div className="button-group">
              <Button className="button button-gap" raised disabled={!(!this.props.unsaved && this.props.post.hasOwnProperty('draft'))} onClick={this.props.onPublish} >Publish</Button>
              <Button className="button" raised onClick={this.props.onReset} disabled={!this.props.post.hasOwnProperty('draft')} >Reset</Button>
            </div>
            <div className="spacer"></div>
            <TextField label="Title" value={this.props.post.title} onChange={e => this.handleChange('title', e.target.value)} />
            <TextField label="Handle" value={this.props.post.handle} onChange={e => this.handleChange('handle', e.target.value)} disabled={this.props.post._id ? true : false} />
            <TextField label="Description" value={this.props.post.description} onChange={e => this.handleChange('description', e.target.value)} textarea />
            <Select
              value={this.props.post.category}
              onChange={e => this.handleChange('category', e.target.value)}
              label="Category"
              options={this.state.categories.map(category => ({ label: category.title, value: category.handle }))}
            />
            <TextField label="Image Link" value={this.props.post.imageLink} onChange={e => this.handleChange('imageLin', e.target.value)} />
            <img className="sidebar-image" src={this.props.post.imageLink} alt={this.props.post.title} />
          </DrawerContent>
        </Drawer>
      </NoSSR>
    )
  }
}

export default PostSideBar
