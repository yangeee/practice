import React from 'react';

function formProvider(fields) {//fields包含表单中需要处理的字段,类似name,age..
	return function (Comp){

		const initialFormState = {};//一个复制的对象，便于修改
		for(const key in fields){//遍历传过来的对象，初始化新对象
			initialFormState[key] = {
				value: fields[key].defaultValue,//key是原对象里的键
				error: ''
			};
		}

		class FormComponent extends React.Component {
			constructor (props){
				super(props);
				this.state = {
					form: initialFormState,//复制的存有规则和默认值的对象
					formValid: false//保存整个表单的校验状态
				};
				this.setFormValues = this.setFormValues.bind(this);
				this.handleValueChange = this.handleValueChange.bind(this);
			}
			//此方法用于在组件中主动设置表单的值，起编辑作用
			setFormValues (values) {
				if(!values){
					return;
				}

				const {form} = this.state;//同样的复制一个数组
				let newForm={...form};//再复制一个

				for(const field in form) {
					if(form.hasOwnProperty(field)) {
						if (typeof values[field] !== 'undefined') {
							newForm[field] = {...newForm[field], value: values[field]}
						}
						// 正常情况下主动设置的每个字段一定是有效的
            			newForm[field].valid = true;
					}
				}
				this.setState({form: newForm});
			}
			//用户输入时使用的函数
			handleValueChange (fieldName,value){//value指用户输入
				const {form} = this.state;//解构赋值
				const newFieldState = {value, valid: true,error: ''};//建立一个对象，存储信息
				const fieldRules = fields[fieldName].rules;//规则的数组

				for (let i = 0; i < fieldRules.length; i++) {
					const {pattern,error} = fieldRules[i];//解构赋值
					let valid = false;
					if (typeof pattern === 'function') {//如果是函数，就运用
						valid = pattern(value);
					}else{
						valid = pattern.test(value);//如果是正则,test匹配下
					}

					if (!valid) {//如果不符合要求
						newFieldState.valid = false;//状态改成false不通过
						newFieldState.error = error;
						break;
					}
				}

				const newForm = {...form,[fieldName]: newFieldState};//将新的对象的属性添加进去
				const formValid = Object.values(newForm).every(f => f.valid);
				//Object.values为ES7提案，返回对象中可遍历的键的值的数组，再用every
				//检测数组中每个值的valid是否都为true
				this.setState({//更新数据流
					form: newForm,
					formValid
				});
			}

			render(){
				const {form,formValid} =this.state;
				return (
				  <Comp
					{...this.props} 
					form={form} 
					formValid={formValid} 
					onFormChange={this.handleValueChange}
					setFormValues={this.setFormValues}
				  />
				//前面的{...this.props}表示原组件中的数据，那么意思就是新增了这么多方法？
				//等于抽离出来了添加和编辑中共有的方法？然后再使用这个判断表单输入是否符合规则，
				//并且这些方法还可以在组件中使用this.onFormChange()来使用.
				);
			}
		}
		return FormComponent;
	}
	// body...
}

export default formProvider;