const Footer = () => {
  return (
    <footer className="px-10 border-t border-gray-200 fixed bottom-0 w-full bg-white">
      <div className="max-w-[1220px] mx-auto flex justify-center py-5">
        <p className="text-gray-500 text-sm lg:text-base">
          Check more of my work here:{" "}
          <a
            rel="noreferrer"
            className="text-black underline"
            href="https://portfolio-new-self.vercel.app/"
            target={"_blank"}
          >
            https://portfolio-new-self.vercel.app/
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
