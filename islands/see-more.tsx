import { ComponentChildren } from "preact";
import { signal } from "@preact/signals";

interface SeeMoreProps {
  children: ComponentChildren;
}

const open = signal(false);
const SeeMore = ({children}: SeeMoreProps) => {
  const value = open.value
  const handleToggle = () => {
    open.value = !open.value
  }
  return (
    <div class="flex justify-center flex-col items-center mt-5">
      <button class="font-bold text-center text-white border-solid border-2 border-gray-50 bg-gray-400 px-5 w-fit" onClick={handleToggle}>
        Ver {!value ? 'mais' : 'menos'}
      </button>
      <div class={`${value ? "h-96" : "h-0"} overflow-hidden transition-all delay-200 ease-linear`}>
        {children}
      </div>
    </div>
  );
};

export default SeeMore;
