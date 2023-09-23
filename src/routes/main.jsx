import React, { Suspense, Fragment, lazy } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Loader from "../components/loading/Loading";
import Layout from "../pages/main/Index";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Layout>
                {route.routes ? renderRoutes(route.routes) : <Component />}
              </Layout>
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/login",
    component: lazy(() => import("../pages/login/Login")),
  },
  {
    path: "*",
    layout: Layout,
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("../pages/teste/App")),
      },
      {
        exact: true,
        path: "/cars",
        component: lazy(() => import("../pages/cars/Index")),
      },
      {
        exact: true,
        path: "/clients",
        component: lazy(() => import("../pages/clients/Index")),
      },
      {
        exact: true,
        path: "/types",
        component: lazy(() => import("../pages/types/Index")),
      },
      {
        exact: true,
        path: "/parking",
        component: lazy(() => import("../pages/parking/Index")),
      },
      {
        exact: true,
        path: "/tickets",
        component: lazy(() => import("../pages/tickets/Index")),
      },
    ],
  },
];

export default routes;
