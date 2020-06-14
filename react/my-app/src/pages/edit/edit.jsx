import './edit.css';
import React, { Component } from 'react'
import { Modal, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { confirm } = Modal;

const labels = [
    {
        label: "车辆id",
        placeholder: '请输入车辆id',
        prop: 'id',
        type: 'input',
        disabled: true
    },
    {
        label: "vin码",
        placeholder: '请输入vin码',
        prop: 'vin',
        type: 'input',
        disabled: true
    },
    {
        label: "车牌号",
        placeholder: '请输入车牌号',
        prop: 'carNumber',
        type: 'input'
    },
    {
        label: "上牌时间",
        placeholder: '请选择上牌时间',
        prop: 'licensingTime',
        type: 'date'
    },
    {
        label: "上牌城市",
        placeholder: '请选择上牌城市',
        prop: 'licensingCity',
        type: 'input'
    },
    {
        label: "牌照类型",
        placeholder: '请选择牌照类型',
        prop: 'licensingType',
        type: 'select'
    },
    {
        label: "车辆用途",
        placeholder: '请选择车辆用途',
        prop: 'carUsing',
        type: 'select'
    },
    {
        label: "过户次数",
        placeholder: '请输入过户次数',
        prop: 'transferNumber',
        type: 'input'
    },
    {
        label: "钥匙数量",
        placeholder: '请输入钥匙数量',
        prop: 'keysNumber',
        type: 'input'
    },
    {
        label: "发动机号",
        placeholder: '请输入发动机号',
        prop: 'engineNumber',
        type: 'input'
    },
    {
        label: "外观颜色",
        placeholder: '请选择外观颜色',
        prop: 'outColor',
        type: 'select'
    },
    {
        label: "内饰颜色",
        placeholder: '请选择内饰颜色',
        prop: 'insideColor',
        type: 'select'
    }
]
const selectOptions = [
    {
        name: 'licensingType',
        data: [
            { value: '公户', text: '公户' },
            { value: '私户', text: '私户' }
        ]
    },
    {
        name: 'carUsing',
        data: [
            { value: '营运', text: '营运' },
            { value: '非营运', text: '非营运' }
        ]
    },
    {
        name: 'outColor',
        data: [
            { value: '黑色', text: '黑色' },
            { value: '白色', text: '白色' }
        ]
    },
    {
        name: 'insideColor',
        data: [
            { value: '黑色', text: '黑色' },
            { value: '白色', text: '白色' }
        ]
    }
]

function getOptions(value) {
    let res = selectOptions.find(x => x.name === value);
    return res.data ? res.data : [];
}



class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            formData: ""
        }
    }

    showConfirm = () => {
        var that = this;
        confirm({
            title: '是否确认提交修改?',
            onOk() {
                // console.log('OK');
                that.okEvent();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleCancel = () => {
        this.props.hideDialog()
        this.setState({ visible: false });
    };

    okEvent = () => {
        //最终修改后的数据
        console.log(this.state.formData, 'sure')
    }

    updateData = (prop, value) => {
        const obj = {};
        obj[prop] = value;
        const formData = Object.assign({}, this.state.formData, obj);
        this.setState({
            formData: formData
        });
    }
    input_change = (prop, e) => {
        // console.log(prop,e.target.value)
        this.updateData(prop, e.target.value)
    }

    select_change = (prop, value) => {
        // console.log(prop,value);
        this.updateData(prop, value)
    }

    date_change = (prop, date, dateString) => {
        // console.log(prop,dateString);
        this.updateData(prop, dateString)
    }


    render() {
        const { visible, loading } = this.state
        return (
            <div>
                <Modal
                    title="修改车辆基础信息"
                    visible={visible}
                    width="80vw"
                    wrapClassName="edit-modal"
                    onCancel={this.handleCancel}
                    // destroyOnClose
                    footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={this.showConfirm}>
                            提交
                      </Button>,
                        <Button key="back" onClick={this.handleCancel} >
                            取消
                        </Button>,
                    ]}
                >
                    <div className="edit-form">
                        {
                            labels.map((item, index) => {
                                if (item.type === 'input') {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="label">{item.label}：</div><Input disabled={item.disabled} placeholder={item.placeholder}
                                                defaultValue={this.props.rowData[item.prop]} onChange={this.input_change.bind(this, item.prop)} />
                                        </div>
                                    )
                                } else if (item.type === 'select') {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="label">{item.label}：</div>
                                            <Select defaultValue={this.props.rowData[item.prop]} style={{ width: 220 }}
                                                placeholder="请选择" onChange={this.select_change.bind(this, item.prop)}>
                                                {
                                                    getOptions(item.prop).map((item1, i) => {
                                                        return (
                                                            <Option value={item1.value} key={i}>{item1.text}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    )
                                } else if (item.type === 'date') {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="label">{item.label}：</div><DatePicker onChange={this.date_change.bind(this, item.prop)}
                                                defaultValue={moment(this.props.rowData[item.prop], 'YYYY-MM-DD')} />
                                        </div>
                                    )
                                } else {
                                    return ""
                                }
                            })
                        }

                    </div>

                </Modal>
            </div>
        )
    }
    componentDidMount() {
        // console.log(this.props.rowData);
        this.setState({
            visible: this.props.isShow,
            formData: this.props.rowData
        });
    }



}
export default EditDialog;