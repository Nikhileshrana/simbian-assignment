"use client";
import { useState } from "react";
import { GripVertical } from "lucide-react";
import LeftSide from "./ui/Feature-LeftSide";
import RightSide from "./ui/Feature-RightSide";

function Feature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setInset(percentage);
  };

  return (
    <div className="px-5 w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-white text-sm bg-primary px-2 py-1 rounded-2xl">Security Operations</span>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              See the Simbian difference
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Drag the slider to compare security operations with and without
              Simbian
            </p>
          </div>
          <div className="mt-10 w-full shadow-2xl rounded-2xl">
            <div
              className="relative aspect-3/5 sm:aspect-video w-full h-full overflow-hidden rounded-2xl select-none bg-background text-foreground border border-border"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onMouseLeave={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-muted h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                aria-label="Drag to compare"
                  className="bg-muted rounded scale-125 hover:scale-200 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center border border-border"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none text-muted-foreground" />
                </button>
              </div>

              <div>
                <LeftSide inset={inset} />
                <RightSide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
