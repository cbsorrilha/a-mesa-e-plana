import { ComponentChildren } from "preact";
import { signal } from "@preact/signals";

interface SeeMoreProps {
  children: ComponentChildren;
}

const SeeMore = ({children}: SeeMoreProps) => {
  const open = signal(false);
  return (
    <div>
      <button onClick={() => open.value = !open}>Ver mais</button>
      <div class={`${open ? "h-full" : "h-0"}`}>
        {children}
      </div>
    </div>
  );
};

export default SeeMore;
