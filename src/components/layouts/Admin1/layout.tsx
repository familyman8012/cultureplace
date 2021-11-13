import { Layout, Menu, Breadcrumb } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { prodUpStore, QuillStore } from "@/../src/mobx/store";
import { MenuInfo } from "rc-menu/lib/interface";

import "antd/dist/antd.css";

const { Content, Footer, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuNum, setMenuNum] = useState("");

  const router = useRouter();

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed((prev) => !prev);
  };

  const MenuMove = (e: MenuInfo, path: string) => {
    QuillStore.dir = null;
    QuillStore.data = null;
    router.push(path);
    console.log("e느느느는", e);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={(e) => MenuMove(e, "/admin/product")}
          >
            상품등록
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<DesktopOutlined />}
            onClick={(e) => MenuMove(e, "/admin/notice")}
          >
            공지사항
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<PieChartOutlined />}
            onClick={(e) => MenuMove(e, "/admin/mainvis")}
          >
            메인비쥬얼
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<PieChartOutlined />}
            onClick={(e) => MenuMove(e, "/admin/product")}
          >
            회원관리
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>admin</Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
function useCallBack(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
