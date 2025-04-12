import React from 'react';
import CustomCursor from './components/CustomCursor';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
};

export default Layout;
