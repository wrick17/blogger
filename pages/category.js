import fetch from 'isomorphic-unfetch'
import Layout from './app/layout'
import CategoryComponent from '../components/category/category_component'

const Category = (props) => (
  <Layout>
    <CategoryComponent {...props} />
  </Layout>
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
