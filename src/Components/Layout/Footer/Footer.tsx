import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FbFooter container className=" bg-slate-800 dark:bg-brown">
      <div className="flex justify-center w-full">
        <FbFooter.Copyright
          href="#"
          by="Batel Alemayehu"
          year={2024}
          className="text-slate-100 dark:text-white"
        />
      </div>
    </FbFooter>
  );
};

export default Footer;
