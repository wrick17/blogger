import fetch from 'isomorphic-unfetch'

const Post = (props) => (
  <div>
    <h1>{props.post.title}</h1>
    <h2>{props.post.category}</h2>

    <style jsx>{`
      h1, a, p {
        font-family: "Arial";
      }
    `}</style>
  </div>
)

Post.getInitialProps = async function (context) {
  const { req, query } = context;
  const { id, category } = query;
  
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/api/post/${id}`)
  const post = await res.json()

  return { post }
}

export default Post
