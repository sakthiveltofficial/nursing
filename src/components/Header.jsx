import React from "react";
import "./Header.css";
import { BorderBeam } from "./magicui/border-beam";

function Header() {
  return (
    <div className="flex justify-center items-center  w-full h-fit absolute top-[-2.5rem]  z-10">
      <div className="Notch w-[10rem] h-[5rem] rounded-4xl bg-[#F2F2F2] m-[2rem] cursor-pointer relative flex justify-center items-center">
        <div className="relative w-[95%] h-[70%] rounded-4xl bg-white/20 backdrop-blur-md border border-white/30 z-10 shadow mt-3">
          <BorderBeam
            duration={6}
            size={60}
            className="from-transparent via-blue-500 to-transparent"
          />
          <BorderBeam
            duration={6}
            size={60}
            delay={3}
            className="from-transparent via-green-500 to-transparent"
          />
          {/* <BorderBeam
            duration={6}
            delay={3}
            size={400}
            borderWidth={2}
            className="from-transparent via-blue-500 to-transparent"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
