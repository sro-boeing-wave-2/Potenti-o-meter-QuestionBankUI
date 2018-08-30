using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Admin.Models
{
    public class QuestionBank
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string questionId { get; set; }
        [BsonElement("questionText")]
        public string questionText { get; set; }
        [BsonElement("domain")]
        public string domain { get; set; }
        [BsonRequired]
        public List<Options> OptionList { get; set; }
        [BsonElement("difficultyLevel")]
        public int difficultyLevel { get; set; }
        [BsonElement("conceptTags")]
        public string[] conceptTags;
        [BsonElement("correctOptionList")]
        public List<correctOption> correctOptionList { get; set; }
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
}
