const operators = {
  "=": (a,b) => a === b,
  ">": (a,b) => a > b,
  "<": (a,b) => a < b,
  ">=": (a,b) => a >= b,
  "<=": (a,b) => a <=b,
  "!=": (a,b) => a != b
};

interface RuleDef {
  type?: "all" | "any" | "none",
  left?: string | number /* insert value location in data here */,
  operator: typeof operators,
  right?: string | number /* same */,
  rules?: RuleDef[]
}

/* incorporate rules for the following:
 *
 * "all", all rules in array must be true.
 * "any", one of the rules in the array must be true.
 * "none", none of the rules in the array can be true.
 */

export class Rules {
  constructor() {}

  testRule(rule: string || any[]) {
  }  
}
