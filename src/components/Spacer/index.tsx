type SpacerProps = {
  size: number;
  children?: React.ReactNode;
};
export default function Spacer({ size, children }: SpacerProps) {
  return <div style={{ height: `${size}px` }}>{children}</div>;
}
