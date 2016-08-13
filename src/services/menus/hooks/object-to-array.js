import _ from 'lodash';
import { objectOfArraysToArrayOfObjects } from '../../../components/utility';

export default options => {
  return hook => {

    if (!hook.params.provider) { return hook; }

    hook.data = objectOfArraysToArrayOfObjects(hook.data);
    return hook;
  }
}
