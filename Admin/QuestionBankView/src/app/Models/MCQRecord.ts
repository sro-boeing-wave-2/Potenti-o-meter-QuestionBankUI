export class MCQRecord{

  public QuestionText : any;
  public Options: MCQOption[]= [];
  public ConceptTags = [];
  public DifficultyLevel : any;
  public Domain : any;
  public Taxonomy : any;
  public QuestionType : any;
  public CorrectAnswer : MCQOption;
}

export class MCQOption {
  public OptionText : any;
}
