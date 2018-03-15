import fetch from 'isomorphic-unfetch'
import Layout from './app/layout'
import PostComponent from '../components/post/post_component'

const Post = (props) => { 
  return (
    <Layout>
      <PostComponent {...props} />
    </Layout>
  )
}

Post.getInitialProps = async function (context) {
  const { req, query } = context;
  const { id, category } = query;
  
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/api/post/${id}`)
  const post = await res.json()

  return { post }
}

export default Post
