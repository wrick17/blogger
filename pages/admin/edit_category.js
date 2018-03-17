import Layout from './components/layout'
import CategoryComponent from '../../components/category/category_component'
import CategorySideBar from './components/category_sidebar'
import ActionButton from './components/action_button'
import cookie from 'react-cookies'

import { adminFetch } from './components/utils'

class EditCategory extends React.Component {

  state = {
    category: null,
    unsaved: false
  }

  fillState = (category) => {
    let stateCategory = category;
    if (category.hasOwnProperty('draft') && !Object.keys(category.draft).length) delete stateCategory.draft;
    if (category.hasOwnProperty('draft')) {
      stateCategory = Object.assign({}, category, category.draft);
    }
    this.setState({ category: stateCategory, unsaved: false });
  }

  componentWillMount() {
    const pathnameArr = (this.props.location.pathname).split('/');
    const categoryId = pathnameArr[pathnameArr.length - 1];

    adminFetch(`/api/admin/category/${categoryId}`)
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => {
        location.pathname = '/admin'
      });
  }

  onChange = (field, value) => {
    const category = Object.assign({}, this.state.category, {
      [field]: value
    });
    this.setState({ category, unsaved: true });
  }

  saveCategory = () => {
    const category = this.state.category;
    const id = category._id;
    delete category._id;
    delete category.__v;
    delete category.draft;
    delete category.posts;
    adminFetch('/api/admin/edit-category', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        data: category
      })
    })
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => console.error(err));
  }

  resetCategory = () => {
    const category = this.state.category;
    const id = category._id;
    adminFetch('/api/admin/reset-category', {
      method: 'PUT',
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => console.error(err));
  }

  publishCategory = () => {
    const category = this.state.category;
    const id = category._id;
    adminFetch('/api/admin/publish-category', {
      method: 'PUT',
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Layout>
        <CategorySideBar 
          category={this.state.category} 
          unsaved={this.state.unsaved}
          onSave={this.saveCategory}
          onReset={this.resetCategory}
          onPublish={this.publishCategory}
          onChange={this.onChange} />
        <main className="mdl-layout__content some-gap">
          <div className="page-content some-shadow">
            <CategoryComponent category={this.state.category} admin={true} />
          </div>
        </main>
        {/* <ActionButton /> */}
      </Layout>
    )
  }
}

export default EditCategory
