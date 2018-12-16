
const _module = (() => {
    const privateFoo = () => {};
    const privateBar = [];

    const exported = {
        publicFoo: () => {},
        publicBar: () => {}
    };

    return exported
})();

console.log(_module);