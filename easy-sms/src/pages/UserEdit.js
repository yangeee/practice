import React from 'react';
import UserEditor from '../components/UserEditor';
import PropTypes from 'prop-types';
//编辑用户页面组件
class UserEdit extends React.Component {
	static contextTypes = { //为此页面添加一个能到其他页面的路由
	  router: PropTypes.object
	};

	constructor (props) {
		super(props);
		this.state = {
			user: null
		};
	}

	componentDidMount () {
		const userId = this.props.match.params.id;
		fetch('http://localhost:3000/user/' + userId)
		.then(res => res.json())
		.then(res => {
			this.setState({
				user: res
			});
		});
	}

	render () {
		const {user} = this.state;
		return (
			  	<UserEditor editTarget={user}/>
		);
	}
}
UserEdit.contextTypes = {
  router: PropTypes.object
};
export default UserEdit;
