import { generateClasses } from "@formkit/themes";

const textClassification = {
  outer: "mb-5",
  label: "block mb-1 text-sm",
  inner:
    "border-none rounded-md mb-1 overflow-hidden dark:bg-anodyne-600 focus-within:border-blue-500",
  input:
    "w-full py-4 px-5 dark:bg-anodyne-600 border-none text-base text-anodyne-700 dark:text-anodyne-100 placeholder-gray-400",
  help: "text-xs text-gray-500",
  messages: "list-none p-0 mt-1 mb-0",
  message: "text-error-200 mb-1 text-sm",
};

export default {
  config: {
    classes: generateClasses({
      text: textClassification,
      email: textClassification,
      date: textClassification,
      number: textClassification,
      select: {
        ...textClassification,
        inner: textClassification.inner + " pr-6 bg-anodyne-100",
        input: textClassification.input + " my-[4.5px] bg-anodyne-100",
      },
    }),
  },
};
