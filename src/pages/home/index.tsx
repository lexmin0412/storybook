import {useNavigate} from "react-router-dom";
import {List, FloatingBubble, Toast, SwipeAction} from "antd-mobile";
import {UnorderedListOutline, AddOutline} from "antd-mobile-icons";
import {useOssClient} from "@/hooks";
import {OssClientInitProps} from "@/utils";
import {useRequest} from "ahooks";
import {useEffect, useState} from "react";
import OSS from "ali-oss";
import {DataItem, DataList} from "@/types";
import dayjs from "dayjs";
import {Action} from "antd-mobile/es/components/swipe-action";
import {tagOptions} from "@/constants";

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
        const children = JSON.parse(res.content.toString()).events.sort(
          (prev, cur) => {
            console.log("prev.date", prev.date, cur.date);
            return dayjs(prev.date).isBefore(dayjs(cur.date)) ? 1 : -1;
          }
        );
        console.log("children", children);
        setData([
          {
            id: "11",
            title: "故事列表",
            children,
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

  const rightActions: Action[] = [
    {
      key: "delete",
      text: "删除",
      color: "danger",
      onClick: async (e) => {
        console.log("eeee", e);
        // ossClient?.delete
      },
    },
  ];

  return (
    <div>
      {/* 筛选-排序 */}
      {/* <SortPicker /> */}

      {/* 数据展示 */}
      {data?.map((item) => {
        return (
          <List header={item.title}>
            {item.children?.map((child) => {
							const tagLabels = child.tags
                ?.map((item) => {
                  return tagOptions.find((ele) => ele.value === item)?.label;
                })
                .join(",") || '';
							const diffDays = dayjs(child.date).diff(dayjs(), 'day')
							const isAfterToday = dayjs(child.date).isAfter(dayjs())
							const countdownText =
                diffDays === 0 ? (
                  <div className="text-[#00b578]">就是今天啦</div>
                ) : isAfterToday ? (
                  <div className="text-blue-500">还有 {diffDays} 天</div>
                ) : (
                  `已经过去 ${-diffDays} 天`
                );
              return (
                <SwipeAction key={child.id} leftActions={rightActions}>
                  <List.Item
                    prefix={<UnorderedListOutline />}
                    description={`${child.date}${tagLabels ? ` | ${tagLabels}` :''}`}
                    extra={<>{countdownText}</>}
                    onClick={() => {
                      // Toast.show("敬请期待～");
                      navigate(`/detail/${child.id}`);
                    }}
                  >
                    <div>{child.title}</div>
                  </List.Item>
                </SwipeAction>
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
