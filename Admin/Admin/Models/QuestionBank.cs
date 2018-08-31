using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Admin.Models
{
    
    [BsonKnownTypes(typeof(MCQType), typeof(MMCQType), typeof(trueFalse), typeof(fillBlanks))]
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

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
     
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

    [BsonDiscriminator("MCQType")]
    public class MCQType : Question
    {
        [BsonElement("questionText")]
        public string questionText { get; set; }
        [BsonElement("correctOption")]
        public string correctOption { get; set; }
        [BsonRequired]
        public List<Options> OptionList { get; set; }
    }

    [BsonDiscriminator("MMCQType")]
    public class MMCQType : Question
    {
        [BsonElement("questionText")]
        public string questionText { get; set; }
        
        [BsonElement("correctOptionList")]
        public List<correctOption> correctOptionList { get; set; }
        
        [BsonRequired]
        public List<Options> OptionList { get; set; }
    }

    [BsonDiscriminator("fillBlanks")]
    public class fillBlanks : Question
    {
       [BsonElement("questionText")]
       public string questionText { get; set; }
       
       [BsonElement("correctResponse")]
       public string correctResponse { get; set; }
       
       [BsonRequired]
       public string Input { get; set; }
    }

    [BsonDiscriminator("trueFalse")]
    public class trueFalse : Question
    {        
        [BsonElement("questionText")]
        public string questionText { get; set; }
        
        [BsonElement("correctOption")]
        public string correctOption { get; set; }
        
        [BsonRequired]
        public List<Options> OptionList { get; set; }
    }
}
