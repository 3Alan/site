import mitt from 'mitt';

const emitter = mitt();

window.emitter = emitter;

export function onRouteDidUpdate() {
  // https://github.com/facebook/docusaurus/issues/8278
  setTimeout(() => {
    window.emitter.emit('onRouteDidUpdate');
  });
}
