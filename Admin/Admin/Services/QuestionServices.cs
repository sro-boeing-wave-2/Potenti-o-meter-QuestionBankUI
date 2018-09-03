using System;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;
using Admin.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Admin.Data;
using Newtonsoft.Json;
namespace Admin.Services
{
    public class QuestionServices: IQuestionServices
    {
        private readonly QuestionContext _context = null;
        public QuestionServices(IOptions<Settings> settings)
        {
            _context = new QuestionContext(settings);
        }
        public List<Question> GetAllQuestions()
        {
            return _context.Questions.Find(x => true).ToList();
        }
        
        public void AddQuestion(Question question)
        {
            
            _context.Questions.InsertOne(question);
        }

        public bool DeleteQuestionByDomain(string domain)
        {
            DeleteResult actionResult = _context.Questions.DeleteMany(Builders<Question>.Filter.Eq("domain", domain));
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public bool DeleteQuestionById(string id)
        {
            DeleteResult actionResult =  _context.Questions.DeleteOne(Builders<Question>.Filter.Eq("questionId", id));
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public void EditQuestion(string id, Question question)
        {
            
           
            var filter = Builders<Question>.Filter.Eq(x => x.QuestionId, id);


            var result = _context.Questions.FindOneAndReplace(filter, question);


            // var result = _context.Questions.UpdateOne(filter, update);

        }
    }
}
