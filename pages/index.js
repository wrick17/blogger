import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <div>
    <h1>Categories</h1>
    <ul>
      {
        props.categories.map(category => (
          <li key={category._id}>
            <Link as={`/${category.handle}`} href={`/category?id=${category.handle}`}>
              <a>{category.title}</a>
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

Index.getInitialProps = async function (context) {
  const { req } = context;

  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/api/categories`)
  const categories = await res.json()

  return { categories }
}

export default Index
