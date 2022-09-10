import Form from '@/components/Form/index'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const fromProps = {
  name: 'antdForm',
  formItems: [{
    type: 'input',
    label: 'Username',
    name: 'userName',
    rules: [{ required: true, message: 'Please input your username!' }],
    innerprops: {
      placeholder: 'Username',
      prefix: < UserOutlined />
    }
  }, {
    type: 'input',
    label: 'Password',
    name: 'password',
    rules: [{ required: true, message: 'Please input your password!' }],
    innerprops: {
      placeholder: 'Password',
      type: 'password'
    }
  }, {
    type: 'search',
    label: 'search',
    name: 'search',
    rules: [{ required: true, message: 'Please input your password!' }],
    innerprops: {
      addonBefore: "https://",
      placeholder: "input search text"
    }
  }, {
    type: 'cascader',
    label: '多级选择',
    name: 'cascader',
    rules: [{ required: true, message: 'Please select!' }],
    innerprops: {
      placeholder: '点击选择',
      allowClear: true,
      options: [{
        value: 'Father1',
        label: 'Father1'
      }, {
        value: 'Father2',
        label: 'Father2',
        children: [
          {
            value: 'Son1',
            label: 'Son1'
          }, {
            value: 'Son2',
            label: 'Son2'
          }
        ]
      }]
    }
  }, {
    type: 'checkbox',
    label: '运动',
    name: 'checkbox',
    rules: [{ required: true, message: 'Please choose' }],
    innerprops: {
      options: [
        {
          label: '篮球', value: '篮球'
        }, {
          label: '羽毛球', value: '羽毛球'
        }, {
          label: 'KTV', value: 'KTV'
        }
      ]
    }
  }, {
    type: 'dataPicker',
    label: '日期选择',
    name: '日期选择',
    innerprops: {
      // format: 'H',
      picker: 'time'
    }
  }, {
    type: 'textarea',
    label: 'textarea',
    name: 'textarea',
    innerprops: {
      showCount: true,
      maxLength: 100
    }
  }, {
    type: 'inputNumber',
    label: '输入数值',
    name: 'inputnumber',
    innerprops: {
      prefix: "￥"
    }
  }, {
    type: 'radio',
    label: '单选',
    name: 'radio',
    innerprops: {
      options: ['Apple', 'Pear', 'Orange']
    }
  }, {
    type: 'select',
    label: '下拉选择',
    name: 'select',
    innerprops: {
      showSearch: true,
      mode: 'tags',
      options: [{
        label: '西瓜',
        value: '西瓜'
      }, {
        label: '香蕉',
        value: '香蕉'
      }]
    }
  }, {
    type: 'upload',
    label: '上传',
    name: 'upload',
    innerprops: {
      children: (<Button icon={<UploadOutlined />}>Upload</Button>),
      action: "",
      multiple: true,
      maxCount: 3,
      beforeUpload: (e: any) => {
        return false
      },
    }
  }, {
    type: 'custom',
    label: '自定义',
    name: 'custom',
    element: <div>自定义组件</div>,
  }]
}


function AntdFrom() {
  return (
    <div className='h_antd_con' style={{
      margin: '0 auto',
      width: '500px',
      padding: '10px',
      border: '1px solid #eee'
    }}>
      <Form {...fromProps} />
    </div>
  )
}

export default AntdFrom