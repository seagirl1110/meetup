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

const createDate = (date) => {
  const weekday = date.toLocaleString('en-US', {
    weekday: 'short',
  });

  console.dir(date.toString());

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getUTCDate();

  let meridiem = 'AM';
  let hour = date.getHours();
  if (hour > 12) {
    hour -= 12;
    meridiem = 'pm';
  }
  if (hour.toString().length < 2) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute.toString().length < 2) {
    minute = `${minute}0`;
  }

  const resultDate =
    `${weekday}, ${month} ${day} · ${hour}:${minute} ${meridiem} UTC`.toUpperCase();
  console.log(resultDate);
  return resultDate;
};

const createEvent = (event) => {
  const eventElement = createEl('div', 'event');

  const img = createEl('img', 'event__img');
  img.setAttribute('src', event.image);
  img.setAttribute('alt', 'event-img');

  const content = createEl('div', 'event__content');
  eventElement.append(img, content);

  const dateValue = createDate(event.date);

  const date = createEl('p', 'event__date', dateValue);

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
  eventsContainer.innerHTML = '';
  const eventElementColl = events.map((event) => {
    return createEvent(event);
  });
  eventsContainer.append(...eventElementColl);
};

renderEvents(eventsStore);

// ===== events filter ======

const filtersColl = document.querySelectorAll('.events__filter');

filtersColl.forEach((item) => {
  item.addEventListener('change', (evt) => {
    const selectedElem = evt.target;
    const selectedKey = selectedElem.dataset.events;
    const selectedValue = selectedElem.selectedOptions[0].value;

    let filteredEvents;

    if (selectedValue === 'any') {
      filteredEvents = eventsStore;
    } else if (selectedKey === 'distance') {
      filteredEvents = eventsStore.filter(
        (event) => event.distance <= selectedValue
      );
    } else {
      filteredEvents = eventsStore.filter(
        (event) => event[selectedKey] === selectedValue
      );
    }

    renderEvents(filteredEvents);
  });
});
