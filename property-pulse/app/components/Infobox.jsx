const Infobox = ({
  heading,
  backgroundColor = "bg-gray-100", //default value
  textColor = "text-gray-800", // default value
  children,
  buttonInfo
}) => {
  return (
    <>
        <div class={`${backgroundColor} p-6 rounded-lg shadow-md"`}>
            <h2 class="text-2xl font-bold">{heading}</h2>
            <p class="mt-2 mb-4">
             {children}
            </p>
            <a
              href={buttonInfo.href}
              class={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
            >
              {buttonInfo.text}
            </a>
          </div>
    </>
  );
};

export default Infobox;
