function cachingDecoratorNew(func) {
  const cache = new Map();

  return function (...args) {
    const key = md5(JSON.stringify(args));

    if (cache.has(key)) {
      const result = cache.get(key);
      console.log(`Из кеша: ${result}`);
      return `Из кеша: ${result}`;
    }

    const result = func(...args);
    cache.set(key, result);

    if (cache.size > 5) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    console.log(`Вычисляем: ${result}`);
    return `Вычисляем: ${result}`;
  };
}

function debounceDecoratorNew(func, delay) {
  let timerId = null;    
  let lastArgs = null; 

  function wrapper(...args) {
    wrapper.allCount++;

    if (timerId === null) {
      func.apply(this, args);
      wrapper.count++;

      // Блокируем новые ведущие вызовы на время delay
      timerId = setTimeout(() => {
        timerId = null; 
      }, delay);
    } else {
      clearTimeout(timerId);
      lastArgs = args;

      timerId = setTimeout(() => {
        func.apply(this, lastArgs);
        wrapper.count++;

        timerId = setTimeout(() => {
          timerId = null;
        }, delay);
      }, delay);
    }
  }

  wrapper.count = 0;      
  wrapper.allCount = 0;   

  return wrapper;
}