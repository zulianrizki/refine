import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { DashboardOutlined } from "@ant-design/icons";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
const DashboardPage = () => <div>Dashboard</div>;

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_URL)}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "dashboard",
                        list: "/",
                        meta: {
                            label: "Dashboard",
                            icon: <DashboardOutlined />,
                        },
                    },
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                        show: "/posts/show/:id",
                        meta: {
                            canDelete: true,
                        },
                    },
                ]}
                notificationProvider={notificationProvider}
                options={{
                    warnWhenUnsavedChanges: true,
                    syncWithLocation: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route index element={<DashboardPage />} />

                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                            <Route path="edit/:id" element={<PostEdit />} />
                            <Route path="show/:id" element={<PostShow />} />
                        </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
