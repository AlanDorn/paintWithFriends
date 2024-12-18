import BrushSize from "./brushsize.js";
import ColorPicker from "./colorpicker.js";
import Pencil from "./pencil.js";
import FillTool from "./filltool.js";

export default class Toolbar {
  constructor(virtualCanvas, transactionManager) {
    this.colorpicker = new ColorPicker();
    this.brushsize = new BrushSize();
    this.pencil = new Pencil(virtualCanvas, transactionManager, this);
    this.fillTool = new FillTool(virtualCanvas, transactionManager, this);

    //set the default tool to pencil
    this.activeTool = this.pencil;

    this.setupToolSwitcher();
  }

  setupToolSwitcher() {
    const pencilButton = document.getElementById("pencil");
    const fillToolButton = document.getElementById("fillTool");

    pencilButton.addEventListener("click", () => {
      this.setActiveTool(this.pencil);
      this.updateActiveButton(pencilButton);
    });

    fillToolButton.addEventListener("click", () => {
      this.setActiveTool(this.fillTool);
      this.updateActiveButton(fillToolButton);
    });

    
  }

  setActiveTool(tool){
    this.activeTool = tool;
    console.log(`switched to ${tool.constructor.name}`);
  }

  updateActiveButton(activeButton){
    const buttons = document.querySelectorAll("#toolbar button");

    buttons.forEach((button) => button.classList.remove("active"));
    activeButton.classList.add("active");
  }

  mouseDownLeft(input) {
    this.activeTool.mouseDownLeft(input);
  }

  mouseDownRight(input) {
    this.activeTool.mouseDownRight(input);
  }

  mouseUpLeft(input) {
    this.activeTool.mouseUpLeft(input);
  }

  mouseUpRight(input) {
    this.activeTool.mouseUpRight(input);
  }

  mouseMove(input) {
    this.activeTool.mouseMove(input);
  }
}
