import React from 'react';
import AutoComplete from './AutoComplete';
import PropTypes from 'prop-types';
import request, { get }from '../utils/request';
import { Input, InputNumber, Form, Button, message } from 'antd';

const Option = AutoComplete.Option;
const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class BookEditor extends React.Component {
  static contextTypes = { //为此页面添加一个能到其他页面的路由
    router: PropTypes.object
  };
  constructor (props) {
    super(props);
    this.state = {
      recommendUsers: []//代表当前组件的建议列表，为空数组时，建议列表隐藏,子组件中使用options操作
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
  }

  componentDidMount () {
    const {editTarget, form} = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    const {form, editTarget} = this.props;

    form.validateFields((err, values) => {
      if(err) {
        message.warn(err);
        return;
      }
      let editType = '添加';
      let apiUrl = 'http://localhost:3000/book';
      let method = 'post';
      if (editTarget) {
        editType = '编辑';
        apiUrl += '/' + editTarget.id;
        method = 'put';
    }

    request(method,apiUrl,values)
      .then((res) => {
        if (res.id) {
          message.success(editType + '书本成功');
          this.context.router.history.push('/book/list');
          return;
        } else {
          message.error(editType + '失败');
        }
      })
      .catch((err) => console.error(err));
    });
  }

  getRecommendUsers (partialUserId) {
    get('http://localhost:3000/user?id_like=' + partialUserId)
      .then((res) => {
        if (res.length === 1 && res[0].id === partialUserId) {
        // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
          return;
        }
        // 设置建议列表
        this.setState({
          recommendUsers: res.map((user) => {
            return {
              text: `${user.id}（${user.name}）`,
              value: user.id
            };
          })
        });
      });
  }
//用于在输入值或确定选择了某一项时通知使用者的回调方法，
//使用者可以在这个回调方法中对options、value进行更新
  timer = 0;
  handleOwnerIdChange (value) {

    this.setState({recommendUsers: []});
// 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
    if (this.timer) {
      clearTimeout(this.timer);
    }
    //输入框中有值
    if (value) {
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
         // 真正的请求方法,200ms之后执行下列2行代码
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }

  render () {
    const {recommendUsers} = this.state;
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width:'400px'}}>
        <FormItem label='书名:' {...formLayout}>
          {getFieldDecorator('name',{
            rules: [
              {
                required: true,
                message: '请输入书名'
              }
            ]
          })(<Input type='text'/>)}
        </FormItem>

        <FormItem label="价格：" {...formLayout}>
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: '请输入价格',
                type: 'number'
              },
              {
                min: 1,
                max: 99999,
                type: 'number',
                message: '请输入1~99999的数字'
              }
            ]
          })(<InputNumber/>)}
        </FormItem>

        <FormItem label="所有者：" {...formLayout}>
          {getFieldDecorator('owner_id', {
            rules: [
              {
                required: true,
                message: '请输入所有者ID'
              },
              {
                pattern: /^\d*$/,
                message: '请输入正确的ID'
              }
            ]
          })(
            <AutoComplete
              options={recommendUsers}
              onChange={this.handleOwnerIdChange}
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}
BookEditor = Form.create()(BookEditor);

export default BookEditor;