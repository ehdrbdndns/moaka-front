import { clearTimeout, setTimeout } from 'timers';

let toastingTime: NodeJS.Timeout;
const animationClass = 'toast-show-fixed__pase-in';

const toasting = (toastElem: React.RefObject<HTMLDivElement>) => {
  clearTimeout(toastingTime);

  toastElem.current?.classList.add(animationClass);

  toastingTime = setTimeout(
    () => toastElem.current?.classList.remove(animationClass),
    3000,
  );
};

const openToast = (toastElem: React.RefObject<HTMLDivElement>) => {
  toastElem.current?.classList.add(animationClass);
};

const closeToast = (toastElem: React.RefObject<HTMLDivElement>) => {
  toastElem.current?.classList.remove(animationClass);
};

export { toasting, openToast, closeToast };
