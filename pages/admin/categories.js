import { adminFetch } from './components/utils'
import Layout from './components/layout'
import Link from 'next/link'

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
          <h1 className="title">Categories</h1>
          <ul className="cards-container">
            {
              this.state.categories.map(category => (
                <li className="list-card" key={category._id}>
                  <div className="demo-card-square mdl-card mdl-shadow--2dp card">
                    <div className="mdl-card__title mdl-card--expand" style={{ backgroundImage: `url('${category.imageLink}')` }} >
                      <h2 className="mdl-card__title-text title-text">{category.title}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">{category.description}</div>
                    <div className="mdl-card__actions mdl-card--border link-box">
                      <Link as={`/admin/${category.handle}`} href={`/admin/edit_category?id=${category.handle}`}><a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect link">
                        Edit
                      </a></Link>
                    </div>
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
          .cards-container {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            list-style: none;
            padding-left: 0;
          }
          .list-card {
            min-height: 0;
            padding: 20px;
            flex: 1 0 320px;
            max-width: calc(50% - 40px);
          }
          @media (max-width: 768px) {
            .cards-container {
              flex-direction: column;
              justify-content: center;              
            }
            .list-card {
              flex: 1 0 100%;
              max-width: 400px;
            }
          }
          .card {
            width: 100%;
          }  
          .mdl-card {
            height: 320px;
          }
          .mdl-card__title {
            padding: 0;
            color: #fff;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .title-text {
            padding: 10px;
            background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
            height: 100px;
            padding-top: 60px;
            box-sizing: border-box;
            width: 100%;
          }
          .link-box {
            padding: 0;
          }
          .link {
            display: block;
            width: 100%;
            padding: 18px 16px;
            text-align: left;
            box-sizing: border-box;
            line-height: 1;
            height: 50px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Categories;
