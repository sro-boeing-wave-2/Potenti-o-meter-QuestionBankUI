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
        public async Task<List<Question>> GetAllQuestions()
        {
            return await _context.Questions.Find(x => true).ToListAsync();
        }
        
        public async Task<Question> AddQuestion(Question question)
        {
            
            await _context.Questions.InsertOneAsync(question);
            return question;
        }

        public async Task<bool> DeleteQuestionByDomain(string domain)
        {
            DeleteResult actionResult = await _context.Questions.DeleteManyAsync(Builders<Question>.Filter.Eq("domain", domain));
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<bool> DeleteQuestionById(string id)
        {
            DeleteResult actionResult = await _context.Questions.DeleteOneAsync(Builders<Question>.Filter.Eq("QuestionId", id));
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task EditQuestion(string id, Question question)
        {
            
           
            var filter = Builders<Question>.Filter.Eq(x => x.QuestionId, id);


            var result = await _context.Questions.FindOneAndReplaceAsync(filter, question);


            // var result = _context.Questions.UpdateOne(filter, update);

        }
    }
}
