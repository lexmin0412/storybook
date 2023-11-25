import { useState } from "react"
import { Button, Space, Cascader } from 'antd-mobile'

export const options = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
        children: [
          {
            label: '西湖区',
            value: '西湖区',
          },
          {
            label: '上城区',
            value: '上城区',
          },
          {
            label: '余杭区',
            value: '余杭区',
            disabled: true,
          },
        ],
      },
      {
        label: '温州',
        value: '温州',
        children: [
          {
            label: '鹿城区',
            value: '鹿城区',
          },
          {
            label: '龙湾区',
            value: '龙湾区',
            disabled: true,
          },
          {
            label: '瓯海区',
            value: '瓯海区',
          },
        ],
      },
      {
        label: '宁波',
        value: '宁波',
        children: [
          {
            label: '海曙区',
            value: '海曙区',
          },
          {
            label: '江北区',
            value: '江北区',
          },
          {
            label: '镇海区',
            value: '镇海区',
          },
        ],
      },
    ],
  },
  {
    label: '安徽',
    value: '安徽',
    children: [
      {
        label: '合肥',
        value: '合肥',
        children: [
          {
            label: '包河区',
            value: '包河区',
          },
          {
            label: '蜀山区',
            value: '蜀山区',
          },
          {
            label: '瑶海区',
            value: '瑶海区',
          },
        ],
      },
      {
        label: '芜湖',
        value: '芜湖',
        children: [
          {
            label: '镜湖区',
            value: '镜湖区',
          },
          {
            label: '弋江区',
            value: '弋江区',
          },
          {
            label: '湾沚区',
            value: '湾沚区',
          },
        ],
      },
    ],
  },
]

interface SortPicker {

}

export default function SortPicker(props: SortPickerProps) {
	const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  return (
    <Space align="center">
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        选择视图
      </Button>
      <Cascader
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={setValue}
        onSelect={(val, extend) => {
          console.log("onSelect", val, extend.items);
        }}
      >
        {(items) => {
          if (items.every((item) => item === null)) {
            return "未选择";
          } else {
            return items.map((item) => item?.label ?? "未选择").join("-");
          }
        }}
      </Cascader>
    </Space>
  );
}
