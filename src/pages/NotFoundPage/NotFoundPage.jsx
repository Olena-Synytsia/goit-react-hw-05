import "animate.css";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={`animate__animated animate__backInDown`}>
        Not Found Page - 404
      </h1>
    </div>
  );
};

export default NotFoundPage;
