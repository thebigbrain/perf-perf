/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* globals MSApp */
declare var MSApp: any;

/**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */
const createMicrosoftUnsafeLocalFunction = function (func: any) {
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    return function (arg0: any, arg1: any, arg2: any, arg3: any) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    };
  } else {
    return func;
  }
};

export default createMicrosoftUnsafeLocalFunction;
