import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Outlet />
    </div>
  );
};
