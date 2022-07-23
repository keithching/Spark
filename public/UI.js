const getEventProvidersBtn = document.getElementById('getEventProviders');
const getEventCategoriesBtn = document.getElementById('getEventCategories');
const getEventsBtn = document.getElementById('getEvents');
const eventProviderForm = document.querySelector('.eventProviderForm');
const eventCategoryForm = document.querySelector('.eventCategoryForm');
const eventForm = document.querySelector('.eventForm');

getEventProvidersBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/api/event_providers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res));
});

getEventCategoriesBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/api/event_categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res));
});

getEventsBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/api/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res));
});

eventProviderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = eventProviderForm.querySelector('input');
    
    fetch(`http://localhost:3000/api/event_providers/${input.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
});

eventCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = eventCategoryForm.querySelector('input');
    
    fetch(`http://localhost:3000/api/event_categories/${input.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = eventForm.querySelector('input');
    
    fetch(`http://localhost:3000/api/events/${input.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
});