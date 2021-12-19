import { commonEvents, addressbookEvents } from './common';
import projectEvents from './project';

export default Object.freeze({
  ...commonEvents,
  ...addressbookEvents,
  ...projectEvents,
});
