import { ThreeCircles } from "react-loader-spinner";

import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.container}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="rgb(0, 128, 128)"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
