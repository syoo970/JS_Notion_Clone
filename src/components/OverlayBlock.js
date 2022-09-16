export default function OverlayBlock({ $target, initialState }) {
    const $block = document.createElement('div');
    $block.classList.add('overlay-block');
    $target.appendChild($block);

    const $bolder = document.createElement('div');
    $bolder.classList.add('bold');
    $bolder.innerText = 'B';

    const $lineThrough = document.createElement('div');
    $lineThrough.classList.add('strikeThrough');
    $lineThrough.innerText = 'L';

    const $underline = document.createElement('div');
    $underline.classList.add('underline');
    $underline.innerText = 'U';

    const $h1 = document.createElement('div');
    $h1.classList.add('fontSize:7');
    $h1.innerText = 'H1';

    const $h2 = document.createElement('div');
    $h2.classList.add('fontSize:5');
    $h2.innerText = 'H2';

    const $h3 = document.createElement('div');
    $h3.classList.add('fontSize:3');
    $h3.innerText = 'H3';

    this.state = initialState;
    // state => bold, etc...

    this.render = () => {
        $block.appendChild($bolder);
        $block.appendChild($lineThrough);
        $block.appendChild($underline);
        $block.appendChild($h1);
        $block.appendChild($h2);
        $block.appendChild($h3);
    };

    this.render();
}