import TitleBlock from "./TitleBlock.js";
import ContentBlock from "./ContentBlock.js";
import OverlayBlock from "./OverlayBlock.js";

export default function Editor({ $target, initialState, onSave, onChange }) {
  const $editor = document.createElement("div");
  $editor.classList.add("editor");
  $target.appendChild($editor);

  const $pageHeader = document.createElement("div");
  $pageHeader.classList.add("page-header");

  const $pageContent = document.createElement("div");
  $pageContent.classList.add("page-content");

  const $overlay = document.createElement('div');

  new OverlayBlock({
      $target: $overlay,
      initialState: {}
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  let timer = null;

  const onEdit = () => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      const data = { title: $pageHeader.innerText, content: $pageContent.innerHTML };
      onSave(data);
    }, 1500); //1.5초 딜레이
  };

  this.render = () => {
    $editor.innerHTML = "";
    $pageContent.innerHTML = "";
    $pageHeader.innerHTML = "";
    const { id, title, content, documents } = this.state;

    $editor.appendChild($pageHeader);
    $editor.appendChild($pageContent);

    new TitleBlock({
      $target: $pageHeader,
      initialState: {
        id,
        title,
        isEditable: true,
      },
      onEdit,
    });

    if (content) {
      const domParse = new DOMParser();
      const htmlDom = domParse.parseFromString(content, "text/html");
      const $content = htmlDom.body.childNodes;

      for (const $node of $content) {
        new ContentBlock({
          $target: $pageContent,
          initialState: {
            content: $node.textContent,
            isEditable: true,
            isNewBlock: false,
          },
          onEdit,
        });
      }
    }
    
    documents.forEach((document) => {
      const { id, title } = document;
      new TitleBlock({
        $target: $pageContent,
        initialState: {
          id,
          title,
          isEditable: false,
        },
        onChange,
      });
    });
  };

  this.render();

  $editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      new ContentBlock({
        $target: e.target,
        initialState: {
          content: "",
          isEditable: true,
          isNewBlock: true,
        },
        onEdit,
      });
    } else if (e.key === "Backspace") {
        if (!e.target.classList.contains('title-block') && e.target.innerText === "") {
            e.preventDefault();
            const $prevElem = e.target.previousElementSibling;
            if($prevElem) {
              $prevElem.focus();
              getSelection().collapse($prevElem,$prevElem.childNodes.length);
            }
            e.target.remove();
        }
    }
  });

  const selectionHandler = () => {
    const { type } = getSelection();
      if (type !== 'Range' && $editor.contains($overlay)) {
        $editor.removeChild($overlay);
      } else if (type !== 'Caret') {
        $editor.appendChild($overlay);
      }
  };

  $editor.addEventListener('selectstart', (e) => {
    if (e.target.parentNode.className === 'title-block') return;
    document.addEventListener('selectionchange', selectionHandler);
  });
  
  $editor.addEventListener('click', () => {
    document.removeEventListener('selectionchange', selectionHandler);
  });

  //selection한 부분을 style 처리해주는 eventlistener
  $overlay.addEventListener('pointerdown', (e) => {
    const { className } = e.target;
    if (className.startsWith('fontSize')) {
      const [format, size] = className.split(':');
      console.log(format, size);
      document.execCommand(format, false, size);
      return;
    }
    document.execCommand(className, false, null);
  });
}
