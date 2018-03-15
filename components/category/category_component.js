import Link from 'next/link'

import foodStyles from './food_styles';
import fashionStyles from './fashion_styles';
import philosophyStyles from './philosophy_styles';

const stylesMap = {
  food: foodStyles,
  fashion: fashionStyles,
  philosophy: philosophyStyles
}

class CategoryComponent extends React.Component {
  render() {
    const props = this.props;

    if (!(props.category && props.category.handle)) return null;

    const styleString = stylesMap[props.category.handle];
    return (
      <div>
        <h1>{props.category.title}</h1>
        <ul>
          {
            (props.category.posts || []).map(post => (
              <li key={post._id}>
                <Link as={`/${props.category.handle}/${post.handle}`} href={`/post?id=${post.handle}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            ))
          }
        </ul>
        <style jsx>{styleString}</style>
      </div>
    )
  }
}

export default CategoryComponent
