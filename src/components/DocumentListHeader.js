export default function DocumentListHeader({ $target, initialState }) {
    const $header = document.createElement('div');
    $header.classList.add('document-list-header');
    $target.appendChild($header);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        $header.innerHTML = `
            <h1>${this.state.title}</h1>
        `;
    };

    this.render();
}