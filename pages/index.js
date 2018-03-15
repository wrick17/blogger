import fetch from 'isomorphic-unfetch'

import HomePage from '../components/home_page'
import Layout from './app/layout'

const Index = (props) => (
  <Layout>
    <HomePage {...props} />
  </Layout>
)

Index.getInitialProps = async function (context) {
  const { req } = context;

  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/api/categories`)
  const categories = await res.json();

  return { categories }
}

export default Index
