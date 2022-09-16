import TitleBlock from "./TitleBlock.js";

export default function DocumentList({ $target, initialState, onChange }) {
  const $docList = document.createElement("div");
  $docList.classList.add("doc-list");
  $target.appendChild($docList);

  this.state = initialState;
  //state => documents list

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $docList.innerHTML = "";
    this.state.forEach((doc) => {
      const { id, title, documents } = doc;
      new TitleBlock({
        $target: $docList,
        initialState: {
          id,
          title,
          isEditable: false,
          isFoldable: true,
        },
        onChange: onChange,
      });
      if (documents.length) {
        new DocumentList({
          $target: $docList,
          initialState: documents,
          onChange: onChange,
        });
      }
    });
  };

  this.render();
}
