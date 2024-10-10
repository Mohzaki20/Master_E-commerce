import { memo } from "react";

const Heading = memo(
  ({ title }: { title: React.ReactNode; children?: React.ReactNode }) => {
    console.log("hi");

    return (
      <h2
        className="mb-3"
        style={{ fontSize: "26px", textTransform: "capitalize" }}
      >
        {title}
      </h2>
    );
  }
);

export default Heading;
