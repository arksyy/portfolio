interface LineProps {
  num: number;
  children?: React.ReactNode;
}

export function Line({ num, children }: LineProps) {
  return (
    <div className="flex leading-7">
      <span className="w-10 text-right pr-4 text-editor-faint text-xs select-none shrink-0">
        {num}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}
