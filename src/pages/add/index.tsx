import {RefObject} from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Selector,
  NavBar,
  Dialog,
} from "antd-mobile";
import dayjs, { type Dayjs } from "dayjs";
import type {DatePickerRef} from "antd-mobile/es/components/date-picker";
import {useOssClient} from "@/hooks";
import {createFrontendCustomRandomId} from "@/utils/id";

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
      <NavBar onBack={back}>新增事件</NavBar>

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
        <Form.Item
          name="date"
          label="日期"
          trigger="onConfirm"
          onClick={(_e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Selector
            columns={3}
            multiple
            options={[
              {label: "旅行", value: "journey"},
              {label: "纪念日", value: "commemorate"},
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
