import clsx from "clsx";

export const HTMLComponent = ({
  htmlContent,
  className,
}: {
  htmlContent: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
