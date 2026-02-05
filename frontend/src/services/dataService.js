import api from './api';

export const journalService = {
    create: (journal) => api.post('/journals', journal),
    update: (id, journal) => api.put(`/journals/${id}`, journal),
    delete: (id) => api.delete(`/journals/${id}`),
    getAll: () => api.get('/journals'),
    getById: (id) => api.get(`/journals/${id}`),
    getByDate: (date) => api.get(`/journals/date/${date}`),
    search: (query) => api.get(`/journals/search?q=${query}`),
    filterByMood: (mood) => api.get(`/journals/filter/mood/${mood}`),
    filterByTag: (tag) => api.get(`/journals/filter/tag/${tag}`),
    filterByContext: (context) => api.get(`/journals/filter/context/${context}`),
    filterByPhase: (phase) => api.get(`/journals/filter/phase/${phase}`)
};

export const memoryService = {
    create: (memory) => api.post('/memories', memory),
    delete: (id) => api.delete(`/memories/${id}`),
    getAll: () => api.get('/memories'),
    filterByMood: (mood) => api.get(`/memories/filter/mood/${mood}`),
    filterByTag: (tag) => api.get(`/memories/filter/tag/${tag}`),
    filterByPhase: (phase) => api.get(`/memories/filter/phase/${phase}`)
};

export const tasteService = {
    create: (taste) => api.post('/tastes', taste),
    update: (id, taste) => api.put(`/tastes/${id}`, taste),
    delete: (id) => api.delete(`/tastes/${id}`),
    getAll: () => api.get('/tastes'),
    getById: (id) => api.get(`/tastes/${id}`),
    filterByType: (type) => api.get(`/tastes/filter/type/${type}`),
    sortByRating: () => api.get('/tastes/sort/rating'),
    search: (query) => api.get(`/tastes/search?q=${query}`),
    filterByTag: (tag) => api.get(`/tastes/filter/tag/${tag}`),
    filterByPhase: (phase) => api.get(`/tastes/filter/phase/${phase}`)
};

export const placeService = {
    create: (place) => api.post('/places', place),
    update: (id, place) => api.put(`/places/${id}`, place),
    delete: (id) => api.delete(`/places/${id}`),
    getAll: () => api.get('/places'),
    getById: (id) => api.get(`/places/${id}`),
    filterByStatus: (status) => api.get(`/places/filter/status/${status}`),
    filterByType: (type) => api.get(`/places/filter/type/${type}`),
    filterByTag: (tag) => api.get(`/places/filter/tag/${tag}`),
    filterByPhase: (phase) => api.get(`/places/filter/phase/${phase}`)
};

export const photoService = {
    upload: (file, metadata) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify(metadata));
        return api.post('/photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    delete: (id) => api.delete(`/photos/${id}`),
    getAll: () => api.get('/photos'),
    getById: (id) => api.get(`/photos/${id}`),
    filterByMood: (mood) => api.get(`/photos/filter/mood/${mood}`),
    filterByTag: (tag) => api.get(`/photos/filter/tag/${tag}`),
    filterByPhase: (phase) => api.get(`/photos/filter/phase/${phase}`)
};

export const phaseService = {
    create: (phase) => api.post('/phases', phase),
    update: (id, phase) => api.put(`/phases/${id}`, phase),
    delete: (id) => api.delete(`/phases/${id}`),
    getAll: () => api.get('/phases'),
    getById: (id) => api.get(`/phases/${id}`)
};
