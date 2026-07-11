const modules = import.meta.glob('../../public/ani/*.webp', { eager: true, query: '?url', import: 'default' });
console.log(modules);
