import { existsSync } from 'node:fs';

const dirname = new URL('.', import.meta.url).pathname;

if (existsSync(`${dirname}/SERVER_HOOKS`)) {
    import('SERVER_HOOKS').then((hooks) => {
        if (hooks?.instrument && typeof hooks.instrument === 'function') {
            hooks.instrument();
        }
        import('./start.js')
    });
} else {
    import('./start.js');
}
