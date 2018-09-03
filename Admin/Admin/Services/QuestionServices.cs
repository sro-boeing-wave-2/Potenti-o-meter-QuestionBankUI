using System;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;
using Admin.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Admin.Data;
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
        //public List<Question> GetQuestionsByDomain(string domainchoice)
        //{
        //    return _context.Questions.Find(x => x.domain == domainchoice).ToList();
        //}
        //public async Task<List<Question>> GetQuestionsByDifficultyLevel(int difficultylevel)
        //{
        //    return await _context.Questions.Find(x => x.difficultyLevel == difficultylevel).ToListAsync();
        //}
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

        //public async Task EditQuestion(int id, Question question)
        //{
        //    Console.WriteLine(question);
        //    var filter = Builders<Question>.Filter.Eq(x => x.questionId, id);
        //    var update = Builders<Question>.Update.Set(x => x.domain, question.domain).Set(x => x.T, note.Text).Set(x => x.IsPinned, note.IsPinned).Set(x => x.Labels, note.Labels).Set(x => x.Checklists, note.Checklists);
        //    var result = await _context.Notes.UpdateOneAsync(filter, update);

        //}
    }
}
