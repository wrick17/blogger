import QuillDeltaToHtmlConverter from 'quill-delta-to-html';

import foodStyles from './food_styles';
import fashionStyles from './fashion_styles';
import philosophyStyles from './philosophy_styles';

const stylesMap = {
  food: foodStyles,
  fashion: fashionStyles,
  philosophy: philosophyStyles
}


class PostComponent extends React.Component {
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
  
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
  
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': ['center'] }],
        ['link', 'image', 'video'],
  
        ['clean']
      ],
      handlers: {
        image: (image, callback) => {
          var range = this.quill.getEditor().getSelection();
          var value = prompt('What is the image URL');
          if (value) {
            this.quill.getEditor().insertEmbed(range.index, 'image', value, "user");
          }
        }
      }
    },
  }

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
  }

  handleChange = (value) => {
    const content = this.quill.editor.getContents();
    if (this.props.onChange) {
      this.props.onChange({content});
    }
  }

  render() {
    const props = this.props;
    const ReactQuill = this.ReactQuill;

    if (!(props.post && props.post.category)) return null;

    const styleString = stylesMap[props.post.category];
    return (
      <div className="post remove-material">
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
        {
          props.admin && typeof window !== 'undefined' && ReactQuill ? 
            <ReactQuill
              theme="snow"
              ref={(quill) => { this.quill = quill; }}
              onChange={this.handleChange}
              modules={this.modules}
              defaultValue={props.post.content}
            /> 
            : 
            <div className="ql-snow"><div className="ql-editor" dangerouslySetInnerHTML={{ __html: (new QuillDeltaToHtmlConverter(props.post.content.ops, {})).convert() }}></div></div>
        }
        <style jsx>{`
          .post {
            max-width: 960px;
            width: 100%;
            margin: auto;
          }  
        `}</style>
      </div>
    )
  }
}

export default PostComponent
