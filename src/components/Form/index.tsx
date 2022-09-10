import { Form, Input, Cascader, Checkbox, DatePicker, InputNumber, Radio, Select, Upload } from 'antd';
import { Rule } from 'antd/lib/form';
import { FC } from 'react';

const { Search, TextArea } = Input;

interface formItemIn {
  type: string,
  label: string,
  name: string,
  rules?: Rule[],
  [other: string]: any
}
interface formIn {
  name: string,
  formItems: formItemIn[]
}

const MForm: FC<formIn> = (props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name={props.name}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {
        props.formItems.map((v, i) => {
          return (
            <Form.Item
              key={i}
              {...v}
            >
              <GetItemEl v={v} />
            </Form.Item>
          )
        })
      }
    </Form>
  );
};


interface getItemElInter {
  v: formItemIn
}

const GetItemEl: FC<getItemElInter> = ({ v }: { v: formItemIn }) => {
  switch (v.type) {
    case 'input':
      return (<Input {...v.innerprops || {}}></Input>)
    case 'cascader':
      return (<Cascader {...v.innerprops || {}}></Cascader>)
    case 'checkbox':
      return (<Checkbox.Group  {...v.innerprops || {}} />)
    case 'dataPicker':
      return (<DatePicker  {...v.innerprops || {}} />)
    case 'search':
      return (<Search  {...v.innerprops || {}} />)
    case 'textarea':
      return (<TextArea  {...v.innerprops || {}} />)
    case 'inputNumber':
      return (<InputNumber {...v.innerprops || {}} />)
    case 'radio':
      return (<Radio.Group {...v.innerprops || {}} />)
    case 'select':
      return (<Select {...v.innerprops || {}} />)
    case 'upload':
      return (<Upload {...v.innerprops || {}}></Upload>)
    case 'custom':
      return v.element
    default:
      return (<Input></Input>)
  }
}

export default MForm;