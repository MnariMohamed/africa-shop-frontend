import Placeholder from "./Placeholder";

export const LoadingPlaceholder = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <Placeholder key={index} width={"40rem"} height={"12rem"} />
    ))}
  </>
);
