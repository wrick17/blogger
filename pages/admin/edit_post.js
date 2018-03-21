import Layout from './components/layout'
import PostComponent from '../../components/post/post_component'
import PostSideBar from './components/post_sidebar'
import Router from 'next/router'

import { adminFetch } from './components/utils'

class EditPost extends React.Component {

  state = {
    post: null,
    unsaved: false
  }

  componentDidMount() {
    const { id, category } = this.props.url.query;

    adminFetch(`/api/admin/post/${id}`)
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => Router.push('/admin/login'))
  }

  fillState = (post) => {
    let statePost = post;
    if (post.hasOwnProperty('draft') && !Object.keys(post.draft).length) delete statePost.draft;
    if (post.hasOwnProperty('draft')) {
      statePost = Object.assign({}, post, post.draft);
    }
    this.setState({ post: statePost, unsaved: false });
  }

  onChange = (obj) => {
    const post = Object.assign({}, this.state.post, obj);
    this.setState({ post, unsaved: true });
  }

  savePost = () => {
    const post = this.state.post;
    const id = post._id;
    delete post._id;
    delete post.__v;
    delete post.draft;
    adminFetch('/api/admin/edit-post', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        data: post
      })
    })
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => console.error(err));
  }

  resetPost = () => {
    const post = this.state.post;
    const id = post._id;
    adminFetch('/api/admin/reset-post', {
      method: 'PUT',
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(this.fillState)
      .catch(err => console.error(err));
  }

  publishPost = () => {
    const post = this.state.post;
    const id = post._id;
    adminFetch('/api/admin/publish-post', {
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
        <PostSideBar 
          post={this.state.post} 
          unsaved={this.state.unsaved}
          onSave={this.savePost}
          onReset={this.resetPost}
          onPublish={this.publishPost}
          onChange={this.onChange} />
        <main className="mdl-layout__content some-gap">
          <div className="page-content some-shadow">
            <PostComponent post={this.state.post} />
          </div>
        </main>
      </Layout>
    )
  }
}

export default EditPost
