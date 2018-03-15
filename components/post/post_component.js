import foodStyles from './food_styles';
import fashionStyles from './fashion_styles';
import philosophyStyles from './philosophy_styles';

const stylesMap = {
  food: foodStyles,
  fashion: fashionStyles,
  philosophy: philosophyStyles
}

class PostComponent extends React.Component {
  render() {
    const props = this.props;

    if (!(props.post && props.post.category)) return null;

    const styleString = stylesMap[props.post.category];
    return (
      <div className="post">
        <h1>{props.post.title}</h1>
        <h3>{props.post.category}</h3>
        <style jsx>{styleString}</style>
        <style jsx>{`
          .post {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default PostComponent
