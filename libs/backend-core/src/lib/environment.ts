
/**
 * It is really kind of stupid (to use a global variable) coz nestjs doesn't has global 'injector'
 * that I can inject some data into bootstrap module. :(
 */
export let environment = {
    flags: {
        static_file: false
    }
};