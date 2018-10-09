import React from 'react';
import { post } from '../utils/request';
import PropTypes from 'prop-types';
import { Icon, Form, Input, Button, message } from 'antd';
import style from '../styles/login-page.less';

const FormItem = Form.Item;

class Login  extends React.Component {
	static contextTypes = { //必须先设置,才能为此页面添加一个能到其他页面的路由
		router: PropTypes.object
	};
	constructor () {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit (e) {
		e.preventDefault();
		//this.props应该是经过formProvider处理之后的数据
		this.props.form.validateFields((err, values) => {
			if (!err) {
				post('http://localhost:3000/login', values)
				  .then((res) => {
				  	if (res) {
				  		message.info('登陆成功');
				  		this.context.router.history.push('/');
				  	} else {
				  		message.info('登陆失败，账号或密码错误')
				  	}
				  })
			}
		});
		
	}

render () {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div className={style.wrapper}>
        <div className={style.body}>
          <header className={style.header}>
            ReactManager
          </header>

          <section className={style.form}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [
                    {
                      required: true,
                      message: '请输入管理员账号',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="text" addonBefore={<Icon type="user"/>}/>
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="password" addonBefore={<Icon type="lock"/>}/>
                )}
              </FormItem>

              <Button className={style.btn} type="primary" htmlType="submit">Sign In</Button>
            </Form>
          </section>

        </div>
      </div>
    );
  }
}
Login = Form.create()(Login);

export default Login;