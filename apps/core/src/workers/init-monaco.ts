export function initMonaco() {
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(id, label) {
      if (label === 'json') {
        return new Worker(new URL('./json.worker', import.meta.url));
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new Worker(new URL('./css.worker', import.meta.url));
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new Worker(new URL('./html.worker', import.meta.url));
      }
      if (label === 'typescript' || label === 'javascript') {
        return new Worker(new URL('./typescript.worker', import.meta.url));
      }
      return new Worker(new URL('./editor.worker', import.meta.url));
    },
  };
}
