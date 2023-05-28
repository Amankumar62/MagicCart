import "./Footer.css";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
export const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <span>
            <a href="https://twitter.com/kr794" target="blank">
              <AiOutlineTwitter />
            </a>
          </span>
          <span>
            <a href="https://github.com/Amankumar62" target="blank">
              <AiFillGithub />
            </a>
          </span>
          <span>
            <a href="https://www.linkedin.com/in/amankr1209/" target="blank">
              <AiFillLinkedin />
            </a>
          </span>
        </div>
        <p>© No Copyright, Feel free to replicate.</p>
      </footer>
    </>
  );
};
