import { AutoBind } from "../decorators/auto-bind";
import { projectState as ProjectState } from "../state/project-state";
import * as Validation from "../util/validation";
import Component from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title",
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description",
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people",
    ) as HTMLInputElement;
    this.configure();
  }
  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      ProjectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  renderContent() {}
  private gatherUserInput(): [string, string, number] | void {
    const titleValue = this.titleInputElement.value;
    const descriptionValue = this.descriptionInputElement.value;
    const peopleValue = this.peopleInputElement.value;
    const validTitle: Validation.Validatable = {
      value: titleValue,
      required: true,
    };
    const validDescription: Validation.Validatable = {
      value: descriptionValue,
      required: true,
      minLength: 5,
    };
    const validPeople: Validation.Validatable = {
      value: peopleValue,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !Validation.validate(validTitle) ||
      !Validation.validate(validDescription) ||
      !Validation.validate(validPeople)
    ) {
      alert("Invalid input please try again!");
      return;
    } else {
      return [titleValue, descriptionValue, +peopleValue];
    }
  }
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
