import { clearTimeout, setTimeout } from 'timers';

let toastingTime: NodeJS.Timeout;

const toasting = (toastElem: React.RefObject<HTMLDivElement>) => {
  clearTimeout(toastingTime);

  let animationClass = 'toast-show-fixed__pase-in';
  toastElem.current?.classList.add(animationClass);

  toastingTime = setTimeout(
    () => toastElem.current?.classList.remove(animationClass),
    5000,
  );
};

export { toasting };
