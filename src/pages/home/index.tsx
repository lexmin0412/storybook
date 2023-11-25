import {useNavigate} from "react-router-dom";
import {List, FloatingBubble, Toast} from "antd-mobile";
import {UnorderedListOutline, AddOutline} from "antd-mobile-icons";
import {useOssClient} from "@/hooks";
import {OssClientInitProps} from "@/utils";
import {useRequest} from "ahooks";
import {useEffect, useState} from "react";
import OSS from "ali-oss";
import { DataItem, DataList } from "@/types";

export default function Home() {
  const handleOssInitModalConfirm = (values: OssClientInitProps) => {
    initOSSClient(values);
    setOssInitModalOpen(false);
  };

  const navigate = useNavigate();
  const {ossClient, ossInitModalOpen, initOSSClient, setOssInitModalOpen} =
    useOssClient(handleOssInitModalConfirm);
		const [data, setData] = useState<DataList>([]);

  console.log("ossClient", ossClient);
  const {runAsync: fetchList} = useRequest(
    () => {
      return ossClient?.getList() as Promise<OSS.GetObjectResult>;
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log("res", JSON.parse(res.content.toString()));
				setData([
          {
            id: "11",
            title: "事件列表",
            children: JSON.parse(res.content.toString()).events,
          },
        ]);
      },
    }
  );

  useEffect(() => {
    if (ossClient) {
      fetchList();
    }
  }, [ossClient]);

  const handleAdd = () => {
    console.log("handleadd");
    navigate("/add");
  };

  return (
    <div>
      {/* 筛选-排序 */}
      {/* <SortPicker /> */}

      {/* 数据展示 */}
      {data?.map((item) => {
        return (
          <List header={item.title}>
            {item.children?.map((child) => {
              return (
                <List.Item
                  key={child.id}
                  prefix={<UnorderedListOutline />}
									description={child.date}
                  onClick={() => {
										Toast.show('敬请期待～')
									}}
                >
                  {child.title}
                </List.Item>
              );
            })}
          </List>
        );
      })}

      {/* 添加按钮 */}
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
        onClick={handleAdd}
      >
        <AddOutline fontSize={32} />
      </FloatingBubble>
    </div>
  );
}
