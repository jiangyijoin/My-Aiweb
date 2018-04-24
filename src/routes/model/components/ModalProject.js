import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item;
class ModalProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk () {
    const Prop = this.props;
    const { validateFields, getFieldsValue } = Prop.form;
    const onOk = Prop.onOk;
    validateFields((errors) => {
      if (errors) {
        return false;
      }
      let fields = getFieldsValue();
      const data = {
        ...fields,
      };
      // console.log(data);
      onOk(data);
    })
  }

  render(){
    const Prop = {...this.props, onOk: this.handleOk};
    const { getFieldDecorator } = Prop.form;
    const { dataSource = {} } = Prop;
    const { desc, name, placeholder } = dataSource;
    return (
      <Modal {...Prop}>
        <Form onSubmit={this.handleSubmit} ref="form">
          <FormItem>{desc}</FormItem>
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                { required: true, message:'名称不能为空！'},
              ]
            })(<Input placeholder={placeholder}/>)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

ModalProject.propTypes = {
  onOk: PropTypes.func,
};

export default Form.create()(ModalProject)
