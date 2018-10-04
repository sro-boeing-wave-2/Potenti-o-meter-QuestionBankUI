export class MMCQRecord {
  public questionText : any;
  public options: MMCQOption[]= [];
  public conceptTags = [];
  public difficultyLevel : any;
  public domain : any;
  public taxonomy : any;
  public questionType : any;
  public correctAnswer : MMCQOption[] = [];
}

export class MMCQOption {
  public optionText : any;
  public raw :any;
}
