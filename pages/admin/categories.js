import { adminFetch } from './components/utils'
import Layout from './components/layout'
import Link from 'next/link'

import { Card, CardPrimaryAction, CardMedia, CardAction, CardActions, CardActionButtons } from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';

class Categories extends React.Component {
  
  state = {
    categories: []
  }

  componentDidMount() {
    adminFetch('/api/admin/categories')
      .then(res => res.json())
      .then(categories => this.setState({ categories }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <Typography use="headline" className="title">Categories</Typography>
          <ul className="cards-container">
            {
              this.state.categories.map(category => (
                <li className="list-card">
                  <Link as={`/admin/${category.handle}`} href={`/admin/edit_category?id=${category.handle}`}>
                    <Card>
                      <CardPrimaryAction>
                        <CardMedia sixteenByNine style={{ backgroundImage: `url('${category.imageLink}')` }} />
                        <div style={{ padding: '0 1rem 1rem 1rem' }}>
                          <Typography use="title" tag="h2">{category.title}</Typography>
                          <Typography use="body1" tag="div" theme="text-secondary-on-background">{category.description}</Typography>
                        </div>
                      </CardPrimaryAction>
                      <CardActions>
                        <CardActionButtons>
                          <CardAction>Edit</CardAction>
                        </CardActionButtons>
                      </CardActions>
                    </Card>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </Layout>
    )
  }
}

export default Categories;
