using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Admin.Models
{

    public class Question
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string questionId { get; set; }
        [BsonElement("domain")]
        public string domain { get; set; }
        [BsonElement("difficultyLevel")]
        public int difficultyLevel { get; set; }
        [BsonElement("conceptTags")]
        public string[] conceptTags;
        [BsonElement("questionType")]
        public string questionType { get; set; }
        public Question()
        {
            if (questionType == "MCQ")
            {
                questionStructure = new MCQType();
            }
            else if (questionType == "MMCQ")
            {
                questionStructure = new MMCQType();
            }
            else if (questionType == "TrueFalse")
            {
                questionStructure = new trueFalse();
            }
            else
            {
                questionStructure = new fillBlanks();
            }
        }
        [BsonElement("questionStructure")]
        public IQuestionStructure questionStructure { get; set; }
    }

    public class Options
    {
        [BsonId]
        public string id { get; set; }
        [BsonElement]
        public string Option { get; set; }
       
    }
    public class correctOption
    {
        [BsonId]
        public string id { get; set; }
        [BsonElement]
        public string CorrectOption { get; set; }
    }

    public interface IQuestionStructure
    {
        
    }

    public class MCQType : IQuestionStructure
    {
        [BsonId]
        public string id { get; set; }
        [BsonElement("questionText")]
        public string questionText { get; set; }
        [BsonElement("correctOption")]
        public string correctOption { get; set; }
        [BsonRequired]
        public List<Options> OptionList { get; set; }
    }

    public class MMCQType : IQuestionStructure
    {
        [BsonId]
        public string id { get; set; }
        [BsonElement("questionText")]
        public string questionText { get; set; }
        [BsonElement("correctOptionList")]
        public List<correctOption> correctOptionList { get; set; }
        [BsonRequired]
        public List<Options> OptionList { get; set; }
    }

    public class fillBlanks : IQuestionStructure
    {
        [BsonId]
        public string id { get; set; }
        [BsonElement("questionText")]
        public string questionText { get; set; }
        [BsonElement("correctResponse")]
        public string correctResponse { get; set; }
        [BsonRequired]
        public string Input { get; set; }
    }

    public class trueFalse : IQuestionStructure
    {
        [BsonId]
        public string id { get; set; }
        [BsonElement("questionText")]
        public string questionText { get; set; }
        [BsonElement("correctOption")]
        public string correctOption { get; set; }
        [BsonRequired]
        public List<Options> OptionList { get; set; }
    }
}
