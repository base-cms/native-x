import { helper } from '@ember/component/helper';

export function computeIt([lvalue, operator, rvalue]) {
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
}

export default helper(computeIt);
