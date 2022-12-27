import { Shared } from '../providers/shared.provider';
import { ApiService } from './api.service';

export interface RuleDef {
  type?: 'all' | 'any' | 'none',
  left?: string | number /* insert value location in data here */,
  operator?: typeof operators,
  right?: string | number /* same */,
  rules?: RuleDef[]
}

const operators = {
  '=': (a, b) => a === b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '!=': (a, b) => a != b
};


/* incorporate rules for the following:
 *
 * "all", all rules in array must be true.
 * "any", one of the rules in the array must be true.
 * "none", none of the rules in the array can be true.
 */

export class Rules {
  apiService: ApiService;
  rules: { [key: string]: RuleDef };
  worker: Worker;

  constructor(
    rulesUrl: string
  ) {
    // get rules; Should also be appended to app state / data
    Shared.getService('ApiService').then(apiService => {
      this.apiService = apiService;
      this.apiService.request({
        url: rulesUrl,
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
      }).then(rules => this.rules = rules);
    });

    //this.worker = new Worker()
  }

  testRule(rule: string | RuleDef) {
    if (typeof rule === 'string') {
      // lookup rule in rules from configuration
    }

  }
}
