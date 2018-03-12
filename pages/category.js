import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const Category = (props) => (
  <div>
    <h1>{props.category.title}</h1>
    <ul>
      {
        props.category.posts.map(post => (
          <li key={post._id}>
            <Link as={`/${props.category.handle}/${post.handle}`} href={`/post?id=${post.handle}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))
      }
    </ul>

    <style jsx>{`
      h1, a, p {
        font-family: "Arial";
      }
    `}</style>
  </div>
)

Category.getInitialProps = async function (context) {
  const { req, query } = context;
  const { id } = query;

  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/api/category/${id}`)
  const category = await res.json();

  return { category }
}

export default Category
