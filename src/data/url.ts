// Odkaz uvnitř webu s ohledem na podsložku (BASE), např. url('napojovy-listek/')
export const url = (path = '') => import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\//, '');
