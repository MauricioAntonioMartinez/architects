import { Divider, Typography } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export type Routing = {
  icon: any;
  title?: string;
  component: any;
  path: string;
};

interface routes {
  Wrapper: React.FunctionComponent;
  routers: Routing[];
}

interface ContainerProps {
  Component: React.FunctionComponent;
  title?: string;
}

const PageContainer: React.FC<ContainerProps> = ({ Component, title }) => {
  return (
    <>
      {title && (
        <>
          <Typography.Title type="secondary">{title}</Typography.Title>
          <Divider />
        </>
      )}
      <Component />
    </>
  );
};

const AppPath: React.FC<routes> = (props) => {
  return (
    <props.Wrapper>
      <Switch>
        {props.routers.map((route, key) => {
          return (
            <Route
              key={key}
              path={route.path}
              exact
              component={() => (
                <PageContainer
                  Component={route.component}
                  title={route?.title}
                />
              )}
            />
          );
        })}
        <Redirect to="/" />
      </Switch>
    </props.Wrapper>
  );
};

export default AppPath;
