// import { LoadingStyle } from "features/Wave/components/Loading/style.css";
import { useSprings, useSpring, animated } from "react-spring";

export const Loading = ({ hash }: { hash: string }) => {
  const codeElementSpringProps = useSpring({
    config: { mass: 1, tension: 2000, friction: 200 },
    from: {
      opacity: 0,
      filter: "blur(25px)",
    },
    to: {
      opacity: 1,
      filter: "blur(0px)",
    },
  });

  const text = hash.split("");

  const codeSprings = useSprings(
    text.length,
    text.map((t, i) => ({ ...codeElementSpringProps, delay: 256 * i }))
  );

  return (
    <div>
      <animated.code className="flex justify-center flex-wrap p-4 my-0 mx-auto w-1/4 text-center text-xl text-gray-100 font-bold">
        {codeSprings.map((style, idx) => {
          return (
            <animated.span key={`char${idx}`} style={style}>
              {text[idx]}
            </animated.span>
          );
        })}
      </animated.code>
    </div>
  );
};
