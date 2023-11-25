import {RefObject} from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Selector,
  NavBar,
  Modal,
	TextArea
} from "antd-mobile";
import {useParams} from "react-router-dom";
import dayjs, {type Dayjs} from "dayjs";
import type {DatePickerRef} from "antd-mobile/es/components/date-picker";
import {useOssClient} from "@/hooks";
import {useRequest} from "ahooks";
import { DataItem } from "@/types";

export default function Detail() {
  const {id} = useParams();
  const [form] = Form.useForm();
  const back = () => {
    window.history.back();
  };

  const {ossClient} = useOssClient(() => {});

  const {data} = useRequest(
    () => {
      return ossClient?.getDetail(id as string) as Promise<DataItem>;
    },
    {
      refreshDeps: [ossClient],
      onSuccess: (res) => {
        console.log("resss", dayjs(res.date));
        form.setFieldsValue({
          title: res.title,
					description: res.description,
          tags: res.tags,
          date: new Date(res.date),
        });
      },
    }
  );

  const {loading: delelteLoading, runAsync: handleDelete} = useRequest(
    () => {
      return ossClient?.delete(id as string) as Promise<unknown>;
    },
    {
      manual: true,
      onSuccess: () => {
        back();
      },
    }
  );

  console.log("data", data);

  const {loading: updateLoading, runAsync: handleFinish} = useRequest(
    (values: DataItem) => {
      return ossClient?.update(id as string, {
        ...values,
        date: dayjs(values.date).format("YYYY-MM-DD"),
      }) as Promise<unknown>;
    },
    {
      manual: true,
      onSuccess: () => {
        console.log("即将back");
        back();
      },
    }
  );

  console.log("form", form.getFieldsValue());

  return (
    <div>
      <NavBar onBack={back}>故事详情</NavBar>

      <Form
        form={form}
        name="form"
        onFinish={handleFinish}
        footer={
          <>
            <Button
              loading={updateLoading}
              block
              type="submit"
              color="primary"
              size="large"
            >
              更新
            </Button>
            <Button
              className="mt-4"
              block
              color="danger"
              size="large"
              loading={delelteLoading}
              onClick={() => {
                Modal.confirm({
                  title: "确认删除故事？",
                  onConfirm: async () => {
                    await handleDelete();
                  },
                });
              }}
            >
              删除
            </Button>
          </>
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
