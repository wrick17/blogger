import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';

import NoSSR from 'react-no-ssr'

class CategorySideBar extends React.Component {

  handleChange = (field, value) => {
    if (this.props.onChange) this.props.onChange(field, value);
  }

  render() {
    if (!this.props.category) return null;
    return (
      <NoSSR>
        <Drawer permanent className="drawer">
          <DrawerContent className="paddingmore">
            <div className="button-group">
              <Button className="button" raised disabled={!this.props.unsaved} onClick={this.props.onSave} >Save</Button>
            </div>
            <div className="button-group">
              <Button className="button button-gap" raised disabled={!(!this.props.unsaved && this.props.category.hasOwnProperty('draft'))} onClick={this.props.onPublish} >Publish</Button>
              <Button className="button" raised onClick={this.props.onReset} disabled={!this.props.category.hasOwnProperty('draft')} >Reset</Button>
            </div>
            <div className="spacer"></div>
            <TextField label="Title" value={this.props.category.title} onChange={e => this.handleChange('title', e.target.value)} />
            <TextField label="Handle" value={this.props.category.handle} onChange={e => this.handleChange('handle', e.target.value)} disabled={this.props.category._id ? true : false} />
            <TextField label="Description" value={this.props.category.description} onChange={e => this.handleChange('description', e.target.value)} textarea rows="3" />
            <TextField label="Introduction" value={this.props.category.introduction} onChange={e => this.handleChange('introduction', e.target.value)} textarea rows="6" />
            <TextField label="Image Link" value={this.props.category.imageLink} onChange={e => this.handleChange('imageLin', e.target.value)} />
            <img className="sidebar-image" src={this.props.category.imageLink} alt={this.props.category.title} />
          </DrawerContent>
        </Drawer>
      </NoSSR>
    )
  }
}

export default CategorySideBar
