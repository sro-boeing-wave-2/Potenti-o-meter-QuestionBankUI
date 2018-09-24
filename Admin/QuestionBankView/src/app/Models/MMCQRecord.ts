export class MMCQRecord {
  public QuestionText : any;
  public Options: MMCQOption[]= [];
  public ConceptTags = [];
  public DifficultyLevel : any;
  public Domain : any;
  public Taxonomy : any;
  public QuestionType : any;
  public CorrectAnswer : MMCQOption[] = [];
}

export class MMCQOption {
  public OptionText : any;
}
