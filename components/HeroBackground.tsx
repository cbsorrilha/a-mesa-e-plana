import { ComponentChildren } from "preact";
import { JSX } from "preact";

//TODO: pegar dinamicamente o bg de algum lugar legal com fotos de RPG
const heroIMG = "/hero.jpg";

interface SeeMoreProps extends JSX.HTMLAttributes<HTMLDivElement>{
  children: ComponentChildren;
}

export function HeroBackground({children, ...props}: SeeMoreProps) {
  // 
  return (
    <div {...props} class={`relative ${props.class}`}>
      <div class="w-screen h-screen overflow-hidden bg-no-repeat bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${heroIMG})` }}>
        <div class="w-screen h-screen bg-black opacity-75" />
      </div>
      <div class="z-10 w-screen h-screen relative">
        {children}
      </div>
    </div>
  );
}
