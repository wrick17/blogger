import Link from 'next/link'

const HomePage = (props) => (
  <div className="home-page">
    <h1>Categories</h1>
    <ul>
      {
        (props.categories || []).map(category => (
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

export default HomePage
