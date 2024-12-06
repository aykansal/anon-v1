interface Val {
  bg: string;
  border: boolean;
  content: string;
  size : string
}

const A0_button: React.FC<Val> = ({ bg, border, content , size }) => {
  return (
    <button
      style={{ backgroundColor: bg  , width:size+"px"}}
      className={` h-12 ${
        border ? "border-[2px] border-white/50" : "text-neutral-950"
      } rounded-full `}
    >
      {content}
    </button>
  );
};

export default A0_button;
