/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Given a `prevElement` and `nextElement`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are elements. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevElement
 * @param {?object} nextElement
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */

function shouldUpdateReactComponent(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    //// 1. 同为empty走更新
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement;
  var nextType = typeof nextElement;

  if (prevType === 'string' || prevType === 'number') {
    //// 2. 同为string或者number走更新
    return nextType === 'string' || nextType === 'number';
  } else {
    //// 3. 优化点，可能的bug：
    //// 按照文档上的说法（Keys only make sense in the context of the surrounding array.），这个地方是不应该判断key是否相同的。首先在数组的地方调用时，已经保证了传入的prevElement和nextElement的key一致，其次在非数组中判断是一个错误，会导致非数组判断是否可以刷新时变得更严格了
    // return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    return nextType === 'object' && prevElement.type === nextElement.type;
  }
}

module.exports = shouldUpdateReactComponent;