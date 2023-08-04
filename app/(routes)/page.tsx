// import dynamic from "next/dynamic";
// import { useMediaQuery } from "react-responsive";

import DesktopComponent from "../_components/DesktopComponent";
import MobileComponent from "../_components/MobileComponent";

// const DesktopComponent = dynamic(
//   () => import("@/app/_components/DesktopComponent"),
//   { ssr: false },
// );
// const MobileComponent = dynamic(
//   () => import("@/app/_components/MobileComponent"),
//   { ssr: false },
// );

export default function Home() {
  // const isDesktop = useMediaQuery({ minWidth: 767 });

  // todo: reload if screen size changes and goes from mobile to desktop

  return (
    <>
      <div className="hidden md:block h-full w-full">
        <DesktopComponent />
      </div>
      <div className="block md:hidden">
        <MobileComponent />
      </div>
    </>
  );
}
