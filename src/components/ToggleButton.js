export default function ToggleButton({ $target, initialState }) {
    const $button = document.createElement('button');
    $button.classList.add('toggle-button');
    $target.appendChild($button);

    this.state = initialState;

    this.render = () => {
        $button.innerHTML = this.state.title;
    };

    this.render();

    $button.addEventListener('click', (e) => {
        const $nextElem = e.target.parentNode.nextSibling;
        if ($nextElem.classList.contains('doc-list')) {
            if ($nextElem.style.display === 'none') $nextElem.style.display = 'block';
            else $nextElem.style.display = 'none';
        }
    });
}