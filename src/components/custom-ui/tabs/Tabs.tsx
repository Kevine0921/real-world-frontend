import { FC, PropsWithChildren, ReactNode, useState } from "react";

const Tabs: FC<
  PropsWithChildren<{ data?: Array<{ label: ReactNode; content: ReactNode }> }>
> = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="w-full flex justify-evenly border-b border-slate-200">
        {data.map((item, itemIndex) => {
          const isActive = itemIndex === currentIndex;

          return (
            <div
              key={itemIndex}
              className={
                "cursor-pointer px-4 py-2 " +
                (isActive
                  ? "border-b-4 border-slate-200"
                  : "hover:border-b-2 border-slate-200")
              }
              onClick={() => setCurrentIndex(itemIndex)}
            >
              {item.label ?? ""}
            </div>
          );
        })}
      </div>

      <div>{data?.[currentIndex]?.content ?? null}</div>
    </div>
  );
};

export default Tabs;
