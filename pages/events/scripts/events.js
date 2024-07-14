import { eventsStore } from '../../../api/eventsStore.js';

const eventsContainer = document.querySelector('.events__list');

const createEl = (tag, className, text) => {
  const element = document.createElement(tag);
  element.setAttribute('class', className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const createEvent = (event) => {
  const eventElement = createEl('div', 'event');

  const img = createEl('img', 'event__img');
  img.setAttribute('src', event.image);
  img.setAttribute('alt', 'event-img');

  const content = createEl('div', 'event__content');
  eventElement.append(img, content);

  const date = createEl('p', 'event__date', event.date);

  const title = createEl('h3', 'event__title', event.title);

  const wrapperCategory = createEl('div', 'event__wrapper-category');
  const category = createEl('p', 'event__category', event.category);
  wrapperCategory.append(category);

  if (event.type === 'offline') {
    const distance = createEl('p', 'event__distance', `(${event.distance} km)`);
    wrapperCategory.append(distance);
  } else {
    const type = createEl('div', 'event__type');
    type.innerHTML = `<img src="./../../common-assets/icons/event-online.svg" alt="online"/>
            Online Event`;
    content.append(type);
  }
  content.append(date, title, wrapperCategory);

  if (event.attendees) {
    const wrapperAtendees = createEl('div', 'event__wrapper-attendees');
    const attendees = createEl(
      'span',
      'event__attendees',
      `${event.attendees} attendees`
    );
    wrapperAtendees.append(attendees);
    content.append(wrapperAtendees);
  }

  return eventElement;
};

const renderEvents = (events) => {
  const eventElementColl = events.map((event) => {
    return createEvent(event);
  });
  eventsContainer.append(...eventElementColl);
};

renderEvents(eventsStore);
