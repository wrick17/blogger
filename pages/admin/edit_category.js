import Layout from './components/layout'
import CategoryComponent from '../../components/category/category_component'
import CategorySideBar from './components/category_sidebar'
import Router from 'next/router'

import { adminFetch } from './components/utils'

class EditCategory extends React.Component {

  state = {
    category: null,
    unsaved: false
  }

  componentDidMount() {
    const { id } = this.props.url.query;

    adminFetch(`/api/admin/category/${id}`)
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => Router.push('/admin/login'))
  }

  isSavable = (category) => {
    if (!category) return false;
    const requiredFields = ['handle', 'title'];
    return !requiredFields.filter(field => !category[field]).length;
  }

  fillState = (category) => {
    let stateCategory = category;
    if (category.hasOwnProperty('draft') && !Object.keys(category.draft).length) delete stateCategory.draft;
    if (category.hasOwnProperty('draft')) {
      stateCategory = Object.assign({}, category, category.draft);
    }
    this.setState({ category: stateCategory, unsaved: false });
  }

  onChange = (field, value) => {
    const category = Object.assign({}, this.state.category, {
      [field]: value
    });
    this.setState({ category, unsaved: this.isSavable(category) });
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
        <main className="page-content">
          <CategoryComponent category={this.state.category} admin={true} />
        </main>
      </Layout>
    )
  }
}

export default EditCategory
