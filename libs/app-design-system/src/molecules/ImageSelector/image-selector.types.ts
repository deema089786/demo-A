export type ImageSelectorProps = {
  src: string | null;
  defaultSrc?: string | null;
  onSelectClick(): void;
  onClearClick(): void;
};
