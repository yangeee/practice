import React from 'react';
import BookEditor from '../components/BookEditor';
import PropTypes from 'prop-types';
import { get } from '../utils/request';
class BookEdit extends React.Component {
  static contextTypes = { //为此页面添加一个能到其他页面的路由
    router: PropTypes.object
  };
  constructor (props) {
    super(props);
    this.state = {
      book: null
    };
  }

  componentDidMount () {
    const bookId = this.props.match.params.id;
    get('http://localhost:3000/book/' + bookId)
      .then(res => {
        this.setState({
          book: res
        });
      });
  }

  render () {
    const {book} = this.state;
    return (
          <BookEditor editTarget={book}/>//加了验证反倒无法显示
    );
  }
}


export default BookEdit;