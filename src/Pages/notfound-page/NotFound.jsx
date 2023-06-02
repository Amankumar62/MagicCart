import Lottie from "lottie-react";
import error from "../../animation/404.json";
export const NotFound = () => {
  return (
    <>
      <Lottie animationData={error} loop={true} />
    </>
  );
};
