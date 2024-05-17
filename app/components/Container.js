"use client";

const Container = ({ children }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-[1280px] mx-auto">
      {children}
    </div>
  );
};

export default Container;
