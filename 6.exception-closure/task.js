function parseCount(value) {
  const parsed = Number.parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error('Невалидное значение');
  }
  return parsed;
}

function validateCount(value) {
  try {
    return parseCount(value);
  } catch (error) {
    return error; 
  }
}

class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error('Треугольник с такими сторонами не существует');
    }
  }

  get perimeter() {
    return this.a + this.b + this.c;
  }

  get area() {
    const p = this.perimeter / 2;
    const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    return Number(area.toFixed(3));
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch (error) {
    return {
      get area() {
        return 'Ошибка! Треугольник не существует';
      },
      get perimeter() {
        return 'Ошибка! Треугольник не существует';
      }
    };
  }
}

console.log(parseCount('42'));          
console.log(parseCount('3.14'));        

const result = validateCount('abc');
console.log(result instanceof Error);   
console.log(result.message);            

// Задача 2
const triangle = new Triangle(3, 4, 5);
console.log(triangle.perimeter);        
console.log(triangle.area);             

const invalid = getTriangle(1, 2, 5);
console.log(invalid.perimeter);         
console.log(invalid.area);              