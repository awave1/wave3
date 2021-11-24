import { LoadingStyle } from "features/Wave/components/Loading/style.css";
import { useSprings, useSpring, animated } from "react-spring";

export const Loading = ({ hash }: { hash: string }) => {
  const from = {
    opacity: 0,
  };
  const to = {
    opacity: 1,
  };

  const props = useSpring({
    config: { mass: 1, tension: 2000, friction: 200 },
    from,
    to,
    loop: true,
  });

  const text = hash.split("");

  const springs = useSprings(
    text.length,
    text.map((t, i) => ({ ...props, delay: 256 * i }))
  );

  return (
    <animated.code className={LoadingStyle}>
      {springs.map((style, idx) => {
        return (
          <animated.span key={`char${idx}`} style={style}>
            {text[idx]}
          </animated.span>
        );
      })}
    </animated.code>
  );
};
