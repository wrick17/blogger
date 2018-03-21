import { adminFetch } from './components/utils'
import Layout from './components/layout'
import Link from 'next/link'

class Posts extends React.Component {

  state = {
    posts: []
  }

  componentDidMount() {
    console.log('posts mount');
    adminFetch('/api/admin/posts')
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <h1 className="title">Posts</h1>
          <ul className="list">
            {
              this.state.posts.map(post => (
                <li key={post._id} className="list-item">
                  <div className="demo-card-square mdl-card mdl-shadow--2dp slim-card">
                    <span className="list-title">{post.title}</span>
                    <Link as={`/admin/${post.category}/${post.handle}`} href={`/admin/edit_post?id=${post.handle}&category=${post.category}`} ><a><button className="mdl-button mdl-js-button mdl-button--accent">Edit</button></a></Link>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        <style jsx>{`
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .title {
            padding-left: 20px;
          }  
          .list {
            width: 100%;            
            list-style: none;
            padding: 20px;
            box-sizing: border-box;
          }
          .list-item {
            width: 100%;
            margin-bottom: 20px;
            box-sizing: border-box;
          }
          .slim-card {
            width: 100%;
            min-height: 0;
            padding: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .list-title {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        `}</style>
      </Layout>      
    );
  }
}

export default Posts
