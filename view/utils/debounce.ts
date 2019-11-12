export default function debounce<T extends Function>(func: T, wait: number, immediate: boolean) {
  let timeout: NodeJS.Timeout, result: any;

  var later = function(context: any, args: any[]) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  let debounced: (T & {cancel?: () => void}) = function(...args: any[]) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      if (callNow) {
        timeout = setTimeout(later, wait);
        result = func.apply(this, args);
      } else {
        timeout = setTimeout(function() {
          return later(null, args);
        }, wait);
      }
    } else {
      timeout = setTimeout(function() {
        return later(null, args);
      }, wait);
    }

    return result;
  } as any;

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};