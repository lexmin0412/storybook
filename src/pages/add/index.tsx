import {RefObject} from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Selector,
  NavBar,
  TextArea,
} from "antd-mobile";
import dayjs, { type Dayjs } from "dayjs";
import type {DatePickerRef} from "antd-mobile/es/components/date-picker";
import {useOssClient} from "@/hooks";
import {createFrontendCustomRandomId} from "@/utils/id";
import { tagOptions } from "@/constants";

export default function Add() {
  const back = () => {
    window.history.back();
  };

  const {ossClient} = useOssClient(() => {});

  const onFinish = async(values: {
		title: string
		tags: string[]
		date: Dayjs
	}) => {
    await ossClient?.add({
      id: createFrontendCustomRandomId(),
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DD"),
    })
		back()
  };

  return (
    <div>
      <NavBar onBack={back}>记录故事</NavBar>

      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item name="title" label="标题" rules={[{required: true}]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item name="description" label="描述" rules={[{required: true}]}>
          <TextArea
            placeholder="请输入描述"
            autoSize={{minRows: 3, maxRows: 5}}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="日期"
          trigger="onConfirm"
          onClick={(_e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
          rules={[{required: true}]}
        >
          <DatePicker>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Selector columns={3} multiple options={tagOptions} />
        </Form.Item>
      </Form>
    </div>
  );
}
