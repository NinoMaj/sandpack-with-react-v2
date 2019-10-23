import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const CustomPreviewer = ({ sandpack }) => {
  const { browserFrame, managerStatus } = sandpack;

  const containerRef = React.useRef();
  const [isInitialLoadingDone, setIsInitialLoadingDone] = React.useState(false);

  if (!isInitialLoadingDone && managerStatus === "idle") {
    setIsInitialLoadingDone(true);
  }

  const isLoading =
    managerStatus === "transpiling" ||
    managerStatus === "evaluating" ||
    managerStatus === "installing-dependencies";

  React.useEffect(() => {
    if (!containerRef || !containerRef.current || !browserFrame) return;

    browserFrame.style.width = "400px";
    browserFrame.style.height = "600px";
    browserFrame.style.visibility = "visible";
    browserFrame.style.position = "relative";

    containerRef.current.appendChild(browserFrame);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserFrame]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        overflowX: "hidden"
      }}
    >
      {!isInitialLoadingDone && (
        <React.Fragment>
          <p style={{ marginBottom: 10 }}>Status: {managerStatus}</p>
          {isLoading && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <LoadingSpinner />
            </div>
          )}
        </React.Fragment>
      )}
      <div ref={containerRef} style={{ border: "1px solid lightgray" }} />
    </div>
  );
};

export { CustomPreviewer };
